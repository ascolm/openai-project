export const redirectToSpotify = () => {
  if (!window.isSpotifyEnabled) {
    console.log('not enabled');
    return;
  }

  const scope = 'user-top-read';

  const redirectUri = 'http://localhost:5173/authenticated';

  const baseURL = 'https://accounts.spotify.com/authorize';
  const params = {
    response_type: 'code',
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: redirectUri,
  };

  // Create a URLSearchParams object
  const queryParams = new URLSearchParams(params);
  const fullURL = baseURL + '?' + queryParams.toString();

  window.location.href = fullURL;
};
