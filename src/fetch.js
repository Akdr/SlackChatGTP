import {Configuration, OpenAIApi } from "openai"

export function askAI(question){

    const configuration = new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY
    })

    const messages = [{
        "role": "system",
        "content": "You are a helpful bot that can answer technical questions. Describe the answer well and format it as markdown."
    }]

    messages.push({
        "role": "user",
        "content": question
    });

    const openAI = new OpenAIApi(configuration);

    const generate = async (messages) => {
        const response = await openAI.createChatCompletion({
            model: 'gpt-4',
            messages: messages,
            temperature: 0.4,
        });
        console.log(response.data.choices[0].message.content);
        return response.data.choices[0].message.content|| "No response from OpenAI";
    }

    return generate(messages);

}

