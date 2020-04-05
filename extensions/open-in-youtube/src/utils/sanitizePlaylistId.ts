export default function sanitizePlaylistId(id: string | null | undefined) {
  if (!id) return undefined;
  const prefix = 'RDAMPL';
  if (id?.startsWith(prefix)) {
    id = id.slice(prefix.length);
  }
  return id;
}
