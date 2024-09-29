package main

import (
	"fmt"
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
	
        SendMessages(s,m)

	})

	dg.Identify.Intents = discordgo.IntentsAllWithoutPrivileged

	err = dg.Open()

	if err != nil {
		fmt.Println("Error opening connection,", err)
		return
	}

	fmt.Println("AetherAI is online")
	
    defer dg.Close()

	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	<-sc

}

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

	messages, ok := payload["messages"].([]map[string]interface{})

	if !ok {
		fmt.Println("Error: Unable to assert type for 'messages'")
		return
	}

	if len(messages) > 0 {
		messages[0]["content"] = m.Content
	}

	if m.Author.ID == s.State.User.ID {
		return
	}

	fmt.Println(m.Content)

	//c := Parser(OpenAI(p))

	if m.Content != "" {
		s.ChannelMessageSend(m.ChannelID, GeminiAI(m.Content))
	}

}
