import { getDirectChildrens } from "dom-helper";
import { querystring } from "..";

export interface IPopupContainerContextData {
  radioPlaylist: string | null;
  video: string | null;
  playlist: string | null;
  [key: string]: string | null;
}

export function mergeContexts(
  contexts: IPopupContainerContextData[]
): IPopupContainerContextData {
  const finalContext = contexts.reduce(
    (acc, item) => {
      Object.keys(item).map((key) => {
        if (item[key] && !acc[key].includes(item[key]!)) {
          acc[key].push(item[key]!);
        }
      });
      return acc;
    },
    {
      radioPlaylist: [],
      video: [],
      playlist: [],
    } as {
      radioPlaylist: string[];
      video: string[];
      playlist: string[];
      [key: string]: string[];
    }
  );

  Object.keys(finalContext).map((key) => {
    if (finalContext[key].length > 1) {
      console.warn(
        `finalContext.${key} has ${finalContext[key].length} values, but should have one.`,
        finalContext[key]
      );
    }
  });

  return {
    radioPlaylist: finalContext.radioPlaylist[0],
    video: finalContext.video[0],
    playlist: finalContext.playlist[0],
  };
}

export default function computeContext() {
  const menuNavigationItems = document.getElementsByTagName(
    "ytmusic-menu-navigation-item-renderer"
  );

  // TODO add error throwing here for menuNavigationItems

  const directChildrens = getDirectChildrens(menuNavigationItems);

  const anchors = directChildrens.filter(
    (children) => children instanceof HTMLAnchorElement
  ) as HTMLAnchorElement[];

  const contexts = anchors.map((a) => querystring.smartParse(a.search));

  return mergeContexts(contexts);
}
