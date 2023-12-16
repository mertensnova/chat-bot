package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)


func OpenAI(payload string) string {
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

	if len(response.Choices) > 0 {
		content := response.Choices[0].Message.Content
		return content
	}

	return ""
}
