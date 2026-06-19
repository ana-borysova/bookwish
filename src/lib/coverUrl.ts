export function coverUrl(thumbnail?: string): string | undefined {
  if (!thumbnail) {
    return thumbnail;
  }

  return thumbnail
    .replace("http://", "https://")
    .replace("&edge=curl", "")
    .replace("zoom=1", "zoom=0");
}
