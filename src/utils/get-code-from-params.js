export const getCodeFromParams = () => {
  if (!window.isSpotifyEnabled) {
    return '123';
  }

  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('code');
};
