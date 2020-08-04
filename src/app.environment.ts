const local = false;

export function baseUrl() {
  return local ? 'http://localhost:3000' : 'https://api.jackkennedy.info';
}

export function isLocal() {
  return local;
}
