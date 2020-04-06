const url = "https://www.youtube.com";

export default {
  video: (videoId: string) => `${url}/watch?v=${videoId}`,
  playlist: (listId: string) => `${url}/playlist?list=${listId}`,
  videoInPlaylist: (videoId: string, listId: string) =>
    `${url}/watch?v=${videoId}&list=${listId}`,
};
