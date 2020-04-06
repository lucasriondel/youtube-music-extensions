export function openInNewTab(url: string) {
  window.open(url);
}

export function copyToClipboard(content: string) {
  navigator.clipboard.writeText(content);
}
