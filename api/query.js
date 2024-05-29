"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyAWelcleKDEx80jFVxqyJLw80-RqXUOcNg'; 

const genAI = new GoogleGenerativeAI(API_KEY)

export async function search(prompt, wordCount, languageManner, keywords){
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const newPrompt = 
    prompt +
    `\n Rephrase this text for a real world blog with
    \n- ${wordCount} words
    \n- ${languageManner} manner
    \n Include keywords like ${keywords}
    `
    const result = await model.generateContent(newPrompt);
    const response = result.response;
    const text = response.text();
    return text  
}