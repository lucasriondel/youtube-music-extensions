import { browserActions } from 'dom-helper';
import {
  IPaperIconButtonAttributes,
  popupContainer,
} from 'youtube-music-helper';

const openInYoutubeButtonAttributes: IPaperIconButtonAttributes = {
  id: 'open-in-youtube-menu-item',
  icon: 'icons:exit-to-app',
  title: 'Open in YouTube',
  'aria-label': 'Open in YouTube',
  'aria-disabled': 'false',
};

const openInYoutubePlaylistButtonAttributes: IPaperIconButtonAttributes = {
  id: 'open-in-youtube-playlist-menu-item',
  icon: 'icons:exit-to-app',
  title: 'Open in a YouTube playlist',
  'aria-label': 'Open in a YouTube playlist',
  'aria-disabled': 'false',
};

const openInYoutubeRadioButtonAttributes: IPaperIconButtonAttributes = {
  id: 'open-in-youtube-radio-menu-item',
  icon: 'icons:exit-to-app',
  title: 'Open in a YouTube radio',
  'aria-label': 'Open in a YouTube radio',
  'aria-disabled': 'false',
};

const copyURLToClipboardButtonAttributes: IPaperIconButtonAttributes = {
  id: 'copy-url-to-clipboard-menu-item',
  icon: 'icons:content-copy',
  title: 'Copy URL to clipboard',
  'aria-label': 'Copy URL to clipboard',
  'aria-disabled': 'false',
};

const basicGoToYoutubeButton = (
  url: string,
  buttonAttributes: IPaperIconButtonAttributes
) =>
  popupContainer.createMenuItem(
    buttonAttributes.title,
    () => browserActions.openInNewTab(url),
    buttonAttributes
  );

export const openInYoutubeButton = (url: string) =>
  basicGoToYoutubeButton(url, openInYoutubeButtonAttributes);

export const openInYoutubePlaylistButton = (url: string) =>
  basicGoToYoutubeButton(url, openInYoutubePlaylistButtonAttributes);

export const openInYoutubeRadioButton = (url: string) =>
  basicGoToYoutubeButton(url, openInYoutubeRadioButtonAttributes);

export const copyURLToClipboardButton = (url: string) =>
  popupContainer.createMenuItem(
    copyURLToClipboardButtonAttributes.title,
    () => {
      browserActions.copyToClipboard(url);
      popupContainer.hide();
    },
    copyURLToClipboardButtonAttributes
  );
