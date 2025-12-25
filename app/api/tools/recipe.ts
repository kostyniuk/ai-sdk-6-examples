import { z } from 'zod';
import { google } from '@ai-sdk/google';
import { generateText, Output, tool } from 'ai';

export const recipeTool = tool({
    description: 'A tool for generating recipes for a given ingredient list or dish name',
    inputSchema: z.object({
        ingredientList: z.array(z.string()).optional().describe('The list of ingredients'),
        dishName: z.string().optional().describe('The name of the dish'),
    }),
    execute: async ({ ingredientList, dishName }) => {
        const schema = z.object({
            name: z.string().describe('Recipe name'),
            ingredients: z.array(z.string()).describe('Ingredient list'),
            instructions: z.array(z.string()).describe('Step-by-step instructions'),
        });

        const topic =
            dishName?.trim()
                ? `a recipe for "${dishName.trim()}"`
                : ingredientList?.length
                    ? `a recipe using: ${ingredientList.join(', ')}`
                    : 'a simple recipe';

        const { output } = await generateText({
            model: google('gemini-2.5-flash'),
            output: Output.object({schema}),
            prompt:
                `Generate ${topic}. ` +
                'Return only JSON that matches the schema. ' +
                'Keep ingredients and instructions concise.' +
                'Use the following format: ' +
                'Ingredients: ' +
                '1. Ingredient 1' +
                '2. Ingredient 2' +
                '3. Ingredient 3' +
                'Instructions: ' +
                '1. Step 1' +
                '2. Step 2',
        });

        return output;
    },
    inputExamples: [
        { input: { ingredientList: ['Chicken', 'Rice'] } },
        { input: { dishName: 'Lasagna' } },
        { input: { ingredientList: ['Chicken', 'Pasta', 'Tomato'], dishName: 'Chicken Pasta' } },
    ]
}); 