package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/bwmarrin/discordgo"
	"github.com/joho/godotenv"
)

type Response struct {
	ID                string      `json:"id"`
	Object            string      `json:"object"`
	Created           int         `json:"created"`
	Model             string      `json:"model"`
	Choices           []Choice    `json:"choices"`
	Usage             Usage       `json:"usage"`
	SystemFingerprint interface{} `json:"system_fingerprint"`
}

type Choice struct {
	Index        int     `json:"index"`
	Message      Message `json:"message"`
	FinishReason string  `json:"finish_reason"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type Usage struct {
	PromptTokens     int `json:"prompt_tokens"`
	CompletionTokens int `json:"completion_tokens"`
	TotalTokens      int `json:"total_tokens"`
}

var (
	Token  string
	OPENAI string
)

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	Token = os.Getenv("DISCORD_TOKEN")
	OPENAI = os.Getenv("KEY")
}

func main() {
	payload := map[string]interface{}{
		"model": "gpt-3.5-turbo",
		"messages": []map[string]interface{}{
			{
				"role":    "system",
				"content": "You are a female assistant, skilled in explaining concepts with  flirty flair.",
			},
			{
				"role":    "user",
				"content": "",
			},
		}}

	dg, err := discordgo.New("Bot " + Token)

	if err != nil {
		fmt.Println("Error creating Discord session,", err)
		return
	}

	dg.AddHandler(func(s *discordgo.Session, m *discordgo.MessageCreate) {
		if m.Author.ID == s.State.User.ID {
			return
		}

		messages, ok := payload["messages"].([]map[string]interface{})
		if !ok {
			fmt.Println("Error: Unable to assert type for 'messages'")
			return
		}

		if len(messages) > 0 {
			messages[1]["content"] = m.Content
		}

		p, err := MapToJSONString(payload)

		if err != nil {
			log.Println(err)
		}

		c := Parser(OpenAI(p))

		if m.Content != "" {
            fmt.Println("User -> " + m.Content)
            fmt.Println("Aether -> " + c)
			s.ChannelMessageSend(m.ChannelID, c)
		}

	})

	dg.Identify.Intents = discordgo.IntentsAllWithoutPrivileged

	err = dg.Open()

	if err != nil {
		fmt.Println("Error opening connection,", err)
		return
	}

	defer dg.Close()

	fmt.Println("AetherAI is online")

	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	<-sc
}

func MapToJSONString(inputMap map[string]interface{}) (string, error) {
	jsonBytes, err := json.Marshal(inputMap)
	if err != nil {
		return "", err
	}
	return string(jsonBytes), nil
}

func OpenAI(payload string) string {
	//cmd := `curl https://api.openai.com/v1/chat/completions   -H "Content-Type: application/json" -H "Authorization: Bearer ` + OPENAI + `" -d ` + payload

	url := "https://api.openai.com/v1/chat/completions"

	client := &http.Client{}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer([]byte(payload)))
	if err != nil {
		fmt.Println("Error creating request:", err)
	}

	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", "Bearer "+OPENAI)

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error performing request:", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
	}

	return string(body)
}

func Parser(body string) string {

	var response Response

	err := json.Unmarshal([]byte(body), &response)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
	}

	if len(response.Choices) > 0 {
		content := response.Choices[0].Message.Content
		return content
	}

	return ""

}
