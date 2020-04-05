const youtubeUrl = 'https://www.youtube.com';

export function youtubeVideoUrl(videoId: string) {
  return `${youtubeUrl}/watch?v=${videoId}`;
}

export function youtubePlaylistUrl(listId: string) {
  return `${youtubeUrl}/playlist?list=${listId}`;
}

export function youtubeVideoAndPlaylistUrl(videoId: string, listId: string) {
  return `${youtubeUrl}/watch?v=${videoId}&list=${listId}`;
}
