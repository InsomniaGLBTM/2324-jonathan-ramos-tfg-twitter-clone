export function getRoute(route: string, hash: string) {
  return route.replace('{slug}', hash);
}

export function getMultipleSlugRoute(route: string, hashes: string[]) {
  return hashes.reduce((acc, hash) => acc.replace('{slug}', hash), route);
}
