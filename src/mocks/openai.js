export const mockOpenAiBaseResponse = {
  id: 'chatcmpl-AZLmUwBT86Nd5j5lygWWag4RKS7F7',
  object: 'chat.completion',
  created: 1732988570,
  model: 'gpt-3.5-turbo-0125',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content: JSON.stringify({
          status: 'return',
          tool: '',
          response: 'Everything everywhere is always awesome',
        }),
        refusal: null,
      },
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 26,
    completion_tokens: 18,
    total_tokens: 44,
    prompt_tokens_details: {
      cached_tokens: 0,
      audio_tokens: 0,
    },
    completion_tokens_details: {
      reasoning_tokens: 0,
      audio_tokens: 0,
      accepted_prediction_tokens: 0,
      rejected_prediction_tokens: 0,
    },
  },
  system_fingerprint: null,
};

export const mockOpenAiRecommendResponse = {
  id: 'chatcmpl-AZLmUwBT86Nd5j5lygWWag4RKS7F7',
  object: 'chat.completion',
  created: 1732988570,
  model: 'gpt-3.5-turbo-0125',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content: JSON.stringify({
          status: 'function',
          tool: 'concertRecommender',
          response: 'I think you should listen to Cynic all the time.',
        }),
        refusal: null,
      },
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 26,
    completion_tokens: 18,
    total_tokens: 44,
    prompt_tokens_details: {
      cached_tokens: 0,
      audio_tokens: 0,
    },
    completion_tokens_details: {
      reasoning_tokens: 0,
      audio_tokens: 0,
      accepted_prediction_tokens: 0,
      rejected_prediction_tokens: 0,
    },
  },
  system_fingerprint: null,
};
