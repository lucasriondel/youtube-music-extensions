import {
  insertYouTubeButtonsFromContextData,
  mergeContexts,
  watchPopupContainerDisplay,
} from './popupContainer';
import { getDirectChildrens } from './utils/htmlElementsCollections';
import { parseQuerystring } from './utils/querystring';

watchPopupContainerDisplay((isDisplayed) => {
  if (isDisplayed) {
    // logPopupContainerContent();
    try {
      const menuNavigationItems = document.getElementsByTagName(
        'ytmusic-menu-navigation-item-renderer'
      );

      // TODO add error throwing here for menuNavigationItems

      const directChildrens = getDirectChildrens(menuNavigationItems);

      const anchors = directChildrens.filter(
        (children) => children instanceof HTMLAnchorElement
      ) as HTMLAnchorElement[];

      const contexts = anchors.map((a) => parseQuerystring(a.search));

      insertYouTubeButtonsFromContextData(mergeContexts(contexts));
    } catch (e) {
      console.error(e);
    }
  }
});
