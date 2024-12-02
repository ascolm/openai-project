import OpenAI from 'openai';
import {
  mockOpenAiBaseResponse,
  mockOpenAiRecommendResponse,
} from '../mocks/openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const functions = [
  {
    name: 'getEventsAndUserArtists',
    description:
      'Find upcoming concerts that the user may like based on the artists the user listens to.',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
];

export const sendBasePromptWithTools = async ({ userPrompt }) => {
  if (!window.isOpenAiEnabled) {
    return mockOpenAiBaseResponse;
  }

  return openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    functions,
  });
};

export const sendRecommendationResponsePromptWithTools = async ({
  userPrompt,
  functionResult,
}) => {
  if (!window.isOpenAiEnabled) {
    return mockOpenAiRecommendResponse;
  }

  return openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
      {
        role: 'system',
        content: `You are a friendly assistant that recommends concerts.
    You know what artists the user likes, and upcoming events.
    Reply to user with a few options, along with your reasoning and refer to artists the user likes. Do not suggest events for artists that are not mentioned in events array. Try to include multiple genres if applicable.
  `,
      },
      {
        role: 'function',
        name: 'getEventsAndUserArtists',
        content: JSON.stringify(functionResult),
      },
    ],
  });
};
