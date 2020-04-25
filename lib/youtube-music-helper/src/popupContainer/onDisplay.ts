import domHelper from "dom-helper";
import { getGlobalSharedObject } from "../global";
import { addOnDisplayCallback, getOnDisplayCallbacks } from "./global";

let init = false;

function initWatcher() {
  console.log("initWatcher");
  const popupContainer = document.getElementsByTagName(
    "ytmusic-popup-container"
  )[0] as HTMLElement;

  if (!popupContainer)
    throw new Error(`popupContainer: popupContainer is ${popupContainer}`);

  let ironDropdown: HTMLElement | null = null;

  let _init = false;

  const popupContainerObserver = domHelper.observe(
    popupContainer,
    { childList: true },
    () => {
      // TODO more checks on mutation such as if it's really an iron-dropdown etc.
      if (!_init) {
        ironDropdown = document.getElementsByTagName(
          "iron-dropdown"
        )[0] as HTMLElement;

        domHelper.observe(
          ironDropdown,
          {
            attributes: true,
            attributeFilter: ["aria-hidden"],
          },
          (m) => {
            const isDisplayed =
              (m.target as HTMLElement).getAttribute("aria-hidden") !== "true";

            if (isDisplayed) {
              getOnDisplayCallbacks()!.map((callback) => callback());
            }
          }
        );

        popupContainerObserver.disconnect();
        _init = true;
      }
    }
  );
}

export default function onDisplay(callback: () => void) {
  if (getGlobalSharedObject().popupContainerOnDisplayCallbacks === undefined) {
    getGlobalSharedObject().popupContainerOnDisplayCallbacks = [];
    addOnDisplayCallback(callback);
    return initWatcher();
  }
  addOnDisplayCallback(callback);
}
