export interface IPaperIconButtonAttributes {
  id?: string;
  icon?: string;
  title: string;
  class?: string;
  "aria-label"?: string;
  "aria-disabled"?: string;
}

function createPaperIconButton(attributes: IPaperIconButtonAttributes) {
  const openInYoutubeButton = document.createElement("paper-icon-button");
  Object.entries(attributes).map(([key, value]) =>
    openInYoutubeButton.setAttribute(key, value)
  );
  return openInYoutubeButton;
}

export const menuItemContainerBaseClass =
  "style-scope ytmusic-menu-popup-renderer";

function createMenuItemHTMDivLElement(
  paperIconAttributes: IPaperIconButtonAttributes,
  itemText: string
) {
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.height = "48px";
  div.style.padding = "0px 8px";
  div.style.cursor = "pointer";
  div.className = "style-scope ytmusic-menu-popup-renderer";

  const icon = createPaperIconButton(paperIconAttributes);
  div.appendChild(icon);

  const text = document.createElement("span");
  text.className = "text style-scope ytmusic-menu-navigation-item-renderer";
  text.innerText = itemText;
  div.appendChild(text);

  return div;
}

export default function createMenuItem(
  buttonText: string,
  onClick: () => void,
  paperIconAttributes: IPaperIconButtonAttributes
) {
  const newMenuItem = createMenuItemHTMDivLElement(
    paperIconAttributes,
    buttonText
  );

  newMenuItem.onclick = onClick;

  return newMenuItem;
}
