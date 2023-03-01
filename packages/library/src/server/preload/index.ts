export function preload(html: string): string {
  const links = html.match(/(<link.*type="text\/css".+?\/>)/gi) ?? [];
  const urls = links[0].match(/href="(.+?)"/gi);

  return (
    urls?.map((url) => `<link as="style" rel="preload" ${url} />`).join("\n") ??
    ""
  );
}
