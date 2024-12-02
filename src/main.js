import './style.css';

import { redirectToSpotify } from './spotify/redirect-to-spotify';
import { getCodeFromParams } from './utils/get-code-from-params';
import { getTopArtists } from './spotify/get-top-artists';
import { getToken } from './spotify/get-token';
import { getEvents } from './jambase/get-events';
import {
  sendBasePrompt,
  sendRecommendationResponsePrompt,
} from './openai/openai';
import {
  sendBasePromptWithTools,
  sendRecommendationResponsePromptWithTools,
} from './openai/openai-tools';
import { appendMessageToUi } from './utils/append-message-to-ui';

window.isOpenAiEnabled = true;
window.isSpotifyEnabled = true;
window.isJambaseEnabled = true;

const shouldUseOpenAiToolFunctionality = true;

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.pathname = '/';
  });
}

const code = getCodeFromParams();
if (!code) {
  redirectToSpotify();
}

const spotifyToken = await getToken(code);

document.querySelector('#user-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = document.querySelector('#user-input').value;

  appendMessageToUi(userInput, 'userMessage');
  document.querySelector('#user-input').value = '';

  shouldUseOpenAiToolFunctionality
    ? handleGptPromptWithTools(userInput)
    : handleGptPrompt(userInput);
});

const handleGptPrompt = async (userPrompt) => {
  const baseResponse = await sendBasePrompt({ userPrompt });
  const content = JSON.parse(baseResponse.choices[0].message.content);

  if (content.status === 'return') {
    appendMessageToUi(content.response, 'gptMessage');
  } else if (
    content.status === 'function' &&
    content.tool === 'concertRecommender'
  ) {
    const artists = await getTopArtists(spotifyToken);
    console.log(artists);
    const events = await getEvents();
    const recommendResponse = await sendRecommendationResponsePrompt({
      artists,
      events,
      userPrompt,
    });

    const recommendContent = recommendResponse.choices[0].message.content;
    appendMessageToUi(recommendContent, 'gptMessage');
  }
};

const handleGptPromptWithTools = async (userPrompt) => {
  const baseResponse = await sendBasePromptWithTools({ userPrompt });
  const message = baseResponse.choices[0].message;
  console.log(baseResponse);

  if (
    message.function_call &&
    message.function_call.name === 'getEventsAndUserArtists'
  ) {
    appendMessageToUi(
      'Hmm let me dive into your private data...',
      'gptMessage',
    );

    const artists = await getTopArtists(spotifyToken);
    console.log(artists);
    const events = await getEvents();

    const recommendResponse = await sendRecommendationResponsePromptWithTools({
      userPrompt,
      functionResult: { artists, events },
    });

    console.log(recommendResponse);

    appendMessageToUi(
      recommendResponse.choices[0].message.content,
      'gptMessage',
    );
  } else {
    appendMessageToUi(message.content, 'gptMessage');
  }
};
