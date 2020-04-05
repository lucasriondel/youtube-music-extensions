import { getDirectChildrens } from './htmlElementsCollections';
import { parseQuerystring, sanitizeQuerystring } from './querystring';

function logGroupCollapsed(title: string, content: () => void) {
  console.groupCollapsed(title);
  content();
  console.groupEnd();
}

// Debugging purpose only
export function logPopupContainerContent() {
  logGroupCollapsed('popupContainerContent', () => {
    const ironDropdown = document.getElementsByTagName(
      'iron-dropdown'
    )[0] as HTMLElement;

    console.log('ironDropdown', ironDropdown);

    const menuNavigationItems = document.getElementsByTagName(
      'ytmusic-menu-navigation-item-renderer'
    );

    logGroupCollapsed(
      `menuNavigationItems (${menuNavigationItems.length})`,
      () => {
        console.log('menuNavigationItems', menuNavigationItems);

        logGroupCollapsed('childrens', () => {
          Array.from(menuNavigationItems).map((element, i) => {
            console.log(`item ${i} children`, element.children);
          });

          getDirectChildrens(menuNavigationItems).map((children) => {
            if (children instanceof HTMLAnchorElement) {
              console.log(
                'HTMLAnchorElement',
                children,
                children.href,
                children.search
              );
            }
          });
        });
      }
    );

    logGroupCollapsed('a', () => {
      getDirectChildrens(menuNavigationItems).map((children) => {
        if (children instanceof HTMLAnchorElement && children.search) {
          console.groupCollapsed(
            'HTMLAnchorElement',
            sanitizeQuerystring(children.search)
          );
          console.log('url', parseQuerystring(children.search));
          console.log('children.href', children.href);
          console.log('children.search', children.search);
          console.log('children', children);
          console.groupEnd();
        }
      });
    });

    const menuServiceItems = document.getElementsByTagName(
      'ytmusic-menu-service-item-renderer'
    );

    logGroupCollapsed(`menuServiceItems (${menuServiceItems.length})`, () => {
      console.log('menuServiceItems', menuServiceItems);
      Array.from(menuServiceItems).map((element, i) => {
        console.log(`item ${i} children`, element.children);
      });
    });
  });
}
