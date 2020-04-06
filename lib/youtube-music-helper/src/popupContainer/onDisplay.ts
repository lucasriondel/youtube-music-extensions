import domHelper from "dom-helper";

export default function onDisplay(callback: () => void) {
  const popupContainer = document.getElementsByTagName(
    "ytmusic-popup-container"
  )[0] as HTMLElement;

  if (!popupContainer)
    throw new Error(`popupContainer: popupContainer is ${popupContainer}`);

  let ironDropdown: HTMLElement | null = null;

  let init = false;

  const popupContainerObserver = domHelper.observe(
    popupContainer,
    { childList: true },
    () => {
      // TODO more checks on mutation such as if it's really an iron-dropdown etc.
      if (!init) {
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
              callback();
            }
          }
        );

        popupContainerObserver.disconnect();
        init = true;
      }
    }
  );
}
