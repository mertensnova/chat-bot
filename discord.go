package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/bwmarrin/discordgo"
)

func DiscordHandler() {
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

func SendMessages(s *discordgo.Session, m *discordgo.MessageCreate) {
	payload := map[string]interface{}{
		"model": "gpt-3.5-turbo",
		"messages": []map[string]interface{}{
			{
				"role":    "system",
				"content": role,
			},
			{
				"role":    "user",
				"content": "",
			},
		},

		"max_tokens": 200,
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
		messages[1]["content"] = m.Content
	}

	p, err := MapToJSONString(payload)

	if err != nil {
		log.Println(err)
	}

	c := Parser(OpenAI(p))

	if m.Content != "" {
		s.ChannelMessageSend(m.ChannelID, c)
		fmt.Println("User -> " + m.Content)
		fmt.Println("Aether -> " + c)
	}

}
