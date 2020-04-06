import queryString from "query-string";
import { IPopupContainerContextData } from "./popupContainer/context";
import { playlistId } from "./sanitize";

export function parse(querystring: string) {
  const data = queryString.parse(querystring);

  return {
    playlist: playlistId(data?.playlist?.toString()),
    list: playlistId(data?.list?.toString()),
    v: data?.v?.toString() || null,
  };
}

export function smartParse(qs: string): IPopupContainerContextData {
  const { playlist, list, v } = parse(qs);
  const { list: playlistFromUrl } = parse(window.location.search);

  return {
    radioPlaylist: list,
    video: v,
    playlist: playlist || playlistFromUrl || null,
  };
}
