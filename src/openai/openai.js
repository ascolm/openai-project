import OpenAI from 'openai';
import {
  mockOpenAiBaseResponse,
  mockOpenAiRecommendResponse,
} from '../mocks/openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const sendPromptToOpenAi = async ({ userPrompt = '', systemPrompt = '' }) => {
  return openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });
};

export const sendBasePrompt = async ({ userPrompt }) => {
  if (!window.isOpenAiEnabled) {
    return mockOpenAiBaseResponse;
  }

  return sendPromptToOpenAi({
    userPrompt,
    systemPrompt: `You are a friendly assistant.
    You know you have access to this tool: 'concertRecommender'. Use it if user asks for concert recommendations.
     Your response should always be just json object in this format:
    {
      "status": "return" | "function",
      "tool": "" | "concertRecommender",
      "response": string,
    }

    If you need to use any tool I mentioned above, status should be 'function' and tool should have the name of the tool, response should be empty. 
    If you don't need to use any tools, status should be 'return' and response should include what your response to the user would be without any modifications.
  `,
  });
};

export const sendRecommendationResponsePrompt = async ({
  userPrompt,
  artists,
  events,
}) => {
  if (!window.isOpenAiEnabled) {
    return mockOpenAiRecommendResponse;
  }

  return sendPromptToOpenAi({
    userPrompt,
    systemPrompt: `You are a friendly assistant that recommends concerts.
    You know the user likes these bands: ${artists}, and you know these are the upcoming events: ${events}.
    Reply to user with a few options, along with your reasoning.
  `,
  });
};
