const accessor = "__youtube-music-helper-lib__";

export type PopupContainerOnDisplayCallback = () => void;

export interface GlobalSharedObject {
  popupContainerOnDisplayCallbacks?: PopupContainerOnDisplayCallback[];
}

const initialGlobalSharedObject: GlobalSharedObject = {
  popupContainerOnDisplayCallbacks: undefined,
};

export function getGlobalSharedObject(): GlobalSharedObject {
  // TODO extend Window type
  const space = (window as { [key: string]: any })[accessor];

  if (space === undefined) {
    (window as { [key: string]: any })[accessor] = initialGlobalSharedObject;
  }

  return (window as { [key: string]: any })[accessor] as GlobalSharedObject;
}
