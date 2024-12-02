export const getToken = async (code) => {
  if (!window.isSpotifyEnabled) {
    return '123';
  }

  const encodedClientCredentials = btoa(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID +
      ':' +
      import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  );

  const redirectUri = 'http://localhost:5173/authenticated';

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + encodedClientCredentials,
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  }).then((res) => res.json());

  return response.access_token;
};
