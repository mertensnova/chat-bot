package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/bwmarrin/discordgo"
)

func Discord() {
	dg, err := discordgo.New("Bot " + Token)

	if err != nil {
		fmt.Println("Error creating Discord session,", err)
		return
	}

	dg.AddHandler(func(s *discordgo.Session, m *discordgo.MessageCreate) {
		SendMessages(s, m)
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
func SendMessages(s *discordgo.Session, m *discordgo.MessageCreate) {
	payload := map[string]interface{}{
		"model": "gemma:2b",
		"messages": []map[string]interface{}{
			{
				"role":    "user",
				"content": "",
			},
		},
		"stream": false,
	}

	if m.Author.ID == s.State.User.ID {
		return
	}

	messages, ok := payload["messages"].([]map[string]interface{})

	if !ok {
		fmt.Println("Error: Unable to assert type for 'messages'")
		return
	}

	if len(messages) > 0 {
		messages[0]["content"] = m.Content
	}
	p, err := MapToJSONString(payload)

	if err != nil {
		log.Println(err)
	}

	c := Parser(OpenAI(p))

	if m.Content != "" {
		s.ChannelMessageSend(m.ChannelID, c)
	}

}
