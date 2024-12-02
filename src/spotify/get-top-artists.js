import { mockArtists } from '../mocks/artists';

export const getTopArtists = async (token) => {
  if (!window.isSpotifyEnabled) {
    return mockArtists;
  }

  console.log('token is');
  console.log(token);

  const artistData = await fetch(
    'https://api.spotify.com/v1/me/top/artists?limit=20',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res) => res.json());

  return artistData.items.map(({ name, genres }) => ({
    name,
    genres,
  }));
};
