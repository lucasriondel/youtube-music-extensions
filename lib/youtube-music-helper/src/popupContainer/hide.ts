export default function hide() {
  const ironDropdown = document.getElementsByTagName(
    "iron-dropdown"
  )[0] as HTMLElement;

  if (ironDropdown) {
    ironDropdown.style.display = "none";
    ironDropdown.setAttribute("aria-hidden", "true");
  }
}
