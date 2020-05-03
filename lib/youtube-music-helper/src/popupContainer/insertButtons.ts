export default function insertButtons(buttons: HTMLDivElement[]) {
  const paperListbox = document.getElementsByTagName("paper-listbox")?.[0];

  if (!paperListbox)
    throw new Error(
      `popupContainer:insertButtons: paperListbox should have a value but is ${paperListbox}`
    );

  buttons.map((button) => paperListbox.appendChild(button));
}
