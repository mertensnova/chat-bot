package main

import (
	"log"

    "strings"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"

	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

/*
curl http://localhost:11434/api/chat -d '{
  "model": "llama3",
  "messages": [
    {
      "role": "user",
      "content": "why is the sky blue?"
    }
  ],
  "stream": false
}'
*/

func GeminiAI(message string) genai.Part {
	ctx := context.Background()

	client, err := genai.NewClient(ctx, option.WithAPIKey(GEMINIAPIKEY))
	if err != nil {
		log.Fatalf("Error creating client: %v", err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-1.5-flash")

	model.SetTemperature(1)
	model.SetTopK(64)
	model.SetTopP(0.95)
	model.SetMaxOutputTokens(8192)
	model.ResponseMIMEType = "text/plain"

	// model.SafetySettings = Adjust safety settings
	// See https://ai.google.dev/gemini-api/docs/safety-settings

	session := model.StartChat()
	resp, err := session.SendMessage(ctx, genai.Text(message))

	if err != nil {
		log.Fatalf("Error sending message: %v", err)
	}



    return resp.Candidates[0].Content.Parts[0]
}


func OpenAI(payload string) string {
	url := "http://localhost:11434/api/chat"

	client := &http.Client{}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer([]byte(payload)))
	if err != nil {
		fmt.Println("Error creating request:", err)
	}

	req.Header.Add("Content-Type", "application/json")
	//req.Header.Add("Authorization", "Bearer "+OPENAI)

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error performing request:", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
	}

	fmt.Println(string(body))

	return string(body)
}

func MapToJSONString(inputMap map[string]interface{}) (string, error) {
	jsonBytes, err := json.Marshal(inputMap)

	if err != nil {
		return "", err
	}
	return string(jsonBytes), nil
}

func Parser(body string) string {

	var response Response

	err := json.Unmarshal([]byte(body), &response)

	if err != nil {
		fmt.Println("Error parsing JSON:", err)
	}

	if len(response.Message.Content) > 0 {
		content := response.Message.Content
		return content
	}

	return ""
}
