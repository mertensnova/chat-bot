package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

var (
	Token        string
	GEMINIAPIKEY string
	OPENAI       string
	role         string = "Your my arabic tutor. You will help me improve my arabic skills by speaking in Arabic and correcting my spellings and grammer in English."
)

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	Token = os.Getenv("DISCORD_KEY")
	OPENAI = os.Getenv("KEY")

	GEMINIAPIKEY = os.Getenv("GEMINI_API_KEY")
}
