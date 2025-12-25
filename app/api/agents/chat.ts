import { google } from "@ai-sdk/google";
import { stepCountIs, ToolLoopAgent } from "ai";
import { recipeTool } from "../tools/recipe";

export const chatAgent = new ToolLoopAgent({
    model: google('gemini-2.5-flash'),
    tools: { recipe: recipeTool },
    instructions: 'You are a helpful assistant that can help with recipes.',
    stopWhen: stepCountIs(20),
});