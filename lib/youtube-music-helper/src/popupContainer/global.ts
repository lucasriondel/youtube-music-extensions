import {
  getGlobalSharedObject,
  PopupContainerOnDisplayCallback,
} from "../global";

export function addOnDisplayCallback(
  callback: PopupContainerOnDisplayCallback
) {
  const globalSharedObject = getGlobalSharedObject();
  if (globalSharedObject.popupContainerOnDisplayCallbacks) {
    globalSharedObject.popupContainerOnDisplayCallbacks.push(callback);
  }
}

export function getOnDisplayCallbacks() {
  return getGlobalSharedObject().popupContainerOnDisplayCallbacks;
}
