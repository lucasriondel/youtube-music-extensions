export function playlistId(id: string | null | undefined) {
  if (!id) return null;
  const prefix = "RDAMPL";
  if (id?.startsWith(prefix)) {
    id = id.slice(prefix.length);
  }
  return id;
}
