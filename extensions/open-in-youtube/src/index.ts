import { popupContainer, youtubeUrl } from 'youtube-music-helper';
import {
  copyURLToClipboardButton,
  openInYoutubeButton,
  openInYoutubePlaylistButton,
  openInYoutubeRadioButton,
} from './buttons';

popupContainer.onDisplay(() => {
  const { playlist, radioPlaylist, video } = popupContainer.computeContext();
  const buttons = [];

  if (playlist && !video) {
    buttons.push(openInYoutubeButton(youtubeUrl.playlist(playlist)));
  }

  if (radioPlaylist && video) {
    buttons.push(
      openInYoutubeRadioButton(youtubeUrl.videoInPlaylist(video, radioPlaylist))
    );
  }

  if (playlist && video) {
    buttons.push(
      openInYoutubePlaylistButton(youtubeUrl.videoInPlaylist(video, playlist))
    );
  }

  if (video) {
    const url = youtubeUrl.video(video);

    buttons.push(openInYoutubeButton(url));
    buttons.push(copyURLToClipboardButton(url));
  }

  popupContainer.insertButtons(buttons);
});
