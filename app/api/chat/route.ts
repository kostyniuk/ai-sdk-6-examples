import { createAgentUIStreamResponse } from 'ai';
import { chatAgent } from '../agents/chat';

export async function POST(req: Request) {
  const { messages } = await req.json();

  return await createAgentUIStreamResponse({
    agent: chatAgent,
    uiMessages: messages,
  });
}
