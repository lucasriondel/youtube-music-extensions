import {
  IPaperIconButtonAttributes,
  popupContainer,
} from 'youtube-music-helper';

const openInGeniusButtonAttributes: IPaperIconButtonAttributes = {
  id: 'open-in-genius-menu-item',
  icon: 'icons:record-voice-over',
  title: 'Open in Genius',
  'aria-label': 'Open in Genius',
  'aria-disabled': 'false',
};

export const openInGeniusButton = () =>
  popupContainer.createMenuItem(
    openInGeniusButtonAttributes.title,
    () => {},
    openInGeniusButtonAttributes
  );
