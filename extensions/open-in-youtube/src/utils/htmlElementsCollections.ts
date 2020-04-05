export function getDirectChildrens(collection: HTMLCollectionOf<Element>) {
  const directChildrens = Array.from(collection)
    .filter((item) => item.children && item.children[0])
    .map((item) => item.children[0]);

  return directChildrens;
}
