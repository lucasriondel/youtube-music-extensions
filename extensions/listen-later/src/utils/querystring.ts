import queryString from 'query-string';
import { IPopupContainerContextData } from '../popupContainer';
import sanitizePlaylistId from './sanitizePlaylistId';

export function sanitizeQuerystring(querystring: string) {
  const data = queryString.parse(querystring);

  return {
    playlist: sanitizePlaylistId(data?.playlist?.toString()),
    list: sanitizePlaylistId(data?.list?.toString()),
    v: data?.v?.toString(),
  };
}

export function parseQuerystring(qs: string): IPopupContainerContextData {
  const { playlist, list, v } = sanitizeQuerystring(qs);
  const { list: playlistFromUrl } = sanitizeQuerystring(window.location.search);

  return {
    radioPlaylist: list,
    video: v,
    playlist: playlist || playlistFromUrl,
  };
}
