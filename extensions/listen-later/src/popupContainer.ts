import {
  copyURLToClipboardButton,
  openInYoutubeButton,
  openInYoutubePlaylistButton,
  openInYoutubeRadioButton,
} from './buttons';
import observe from './utils/observe';
import {
  youtubePlaylistUrl,
  youtubeVideoAndPlaylistUrl,
  youtubeVideoUrl,
} from './utils/youtubeUrl';

//  ytmusic-popup-container.style-scope.ytmusic-app
//    iron-dropdown
//      ...
//          div#contentWrapper
//              ytmusic-menu-popup-renderer
//                  paper-listbox#items
//                      ytmusic-menu-navigation-item-renderer[0]
//                          a#navigation-endpoint -> href = yt music url with videoId in query string
//                      ytmusic-menu-navigation-item-renderer
//                      ytmusic-menu-navigation-item-renderer
//                      ...

export function watchPopupContainerDisplay(
  onToggle: (isDisplayed: boolean) => void
) {
  const popupContainer = document.getElementsByTagName(
    'ytmusic-popup-container'
  )[0] as HTMLElement;

  if (!popupContainer)
    throw new Error(`popupContainer: popupContainer is ${popupContainer}`);

  let ironDropdown: HTMLElement | null = null;

  let init = false;

  const popupContainerObserver = observe(
    popupContainer,
    { childList: true },
    () => {
      // TODO more checks on mutation such as if it's really an iron-dropdown etc.
      if (!init) {
        ironDropdown = document.getElementsByTagName(
          'iron-dropdown'
        )[0] as HTMLElement;

        observe(
          ironDropdown,
          {
            attributes: true,
            attributeFilter: ['aria-hidden'],
          },
          (m) => {
            const isDisplayed =
              (m.target as HTMLElement).getAttribute('aria-hidden') !== 'true';

            onToggle(isDisplayed);
          }
        );

        popupContainerObserver.disconnect();
        init = true;
      }
    }
  );
}

export function hidePopupContainer() {
  const ironDropdown = document.getElementsByTagName(
    'iron-dropdown'
  )[0] as HTMLElement;

  if (ironDropdown) {
    ironDropdown.style.display = 'none';
    ironDropdown.setAttribute('aria-hidden', 'true');
  }
}

export interface IPopupContainerContextData {
  radioPlaylist?: string;
  video?: string;
  playlist?: string;
}

export function mergeContexts(
  contexts: IPopupContainerContextData[]
): IPopupContainerContextData {
  const finalContext = contexts.reduce(
    (acc, item) => {
      Object.keys(item).map((key) => {
        if (item[key] && !acc[key].includes(item[key])) {
          acc[key].push(item[key]);
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

export function insertYouTubeButtonsFromContextData({
  playlist,
  radioPlaylist,
  video,
}: IPopupContainerContextData) {
  const paperListbox = document.getElementsByTagName('paper-listbox')?.[0];

  if (!paperListbox)
    throw new Error(
      `insertPopupContainerItem: paperListbox should have a value but is ${paperListbox}`
    );

  if (playlist && !video) {
    paperListbox.appendChild(openInYoutubeButton(youtubePlaylistUrl(playlist)));
  }

  if (radioPlaylist && video) {
    paperListbox.appendChild(
      openInYoutubeRadioButton(youtubeVideoAndPlaylistUrl(video, radioPlaylist))
    );
  }

  if (playlist && video) {
    paperListbox.appendChild(
      openInYoutubePlaylistButton(youtubeVideoAndPlaylistUrl(video, playlist))
    );
  }

  if (video) {
    const url = youtubeVideoUrl(video);

    paperListbox.appendChild(openInYoutubeButton(url));
    paperListbox.appendChild(copyURLToClipboardButton(url));
  }
}
