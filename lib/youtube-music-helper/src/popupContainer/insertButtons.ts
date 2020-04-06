export default function insertButtons(buttons: HTMLDivElement[]) {
  const paperListbox = document.getElementsByTagName("paper-listbox")?.[0];

  if (!paperListbox)
    throw new Error(
      `popupContainer:insertButtons: paperListbox should have a value but is ${paperListbox}`
    );

  console.log("buttons", buttons);
  buttons.map((button) => paperListbox.appendChild(button));
}
