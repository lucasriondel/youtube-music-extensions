import { browserActions } from 'dom-helper';
import { popupContainer } from 'youtube-music-helper';
import { openInGeniusButton } from './buttons';
import genius from './genius';
import youtube from './youtube';

function snippetToTitle({
  channelTitle,
  description,
  title,
}: gapi.client.youtube.ActivitySnippet) {
  if (
    title &&
    channelTitle?.endsWith(' - Topic') &&
    description?.startsWith('Provided to YouTube by ')
  ) {
    return `${channelTitle.slice(
      0,
      channelTitle.length - ' - Topic'.length
    )} - ${title}`;
  } else {
    return title || '';
  }
}

popupContainer.onDisplay(async () => {
  const context = popupContainer.computeContext();

  if (context.video) {
    const menuItem = openInGeniusButton();

    menuItem.style.cursor = 'wait';
    menuItem.className = `${popupContainer.menuItemContainerBaseClass} wait`;

    popupContainer.insertButtons([menuItem]);
    const youtubeVideo = await youtube.getVideo(context.video);
    if (youtubeVideo) {
      const title = snippetToTitle(youtubeVideo);

      const { response } = await genius.search(title);
      if (response.hits.length > 0) {
        const url = response.hits[0].result.url;

        menuItem.onclick = () => browserActions.openInNewTab(url);
      } else {
        menuItem.onclick = () =>
          browserActions.openInNewTab(genius.createSearchUrl(title));
      }
      menuItem.style.cursor = 'pointer';
      menuItem.className = popupContainer.menuItemContainerBaseClass;
    }
  }
});
