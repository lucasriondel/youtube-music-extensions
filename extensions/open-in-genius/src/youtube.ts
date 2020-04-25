import queryString from 'query-string';

const apiUrl = 'https://www.googleapis.com/youtube/v3';

const getVideo = async (
  id: string
): Promise<gapi.client.youtube.ActivitySnippet | undefined> => {
  const qs = queryString.stringify({
    id,
    part: 'snippet',
    key: process.env.YOUTUBE_API_KEY,
  });
  const response = await fetch(`${apiUrl}/videos?${qs}`, {
    method: 'GET',
  });

  const jsonResponse = await response.json();
  return (jsonResponse?.items[0] as gapi.client.youtube.Activity)?.snippet;
};

export default {
  getVideo,
};
