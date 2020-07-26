const local = true;

export function baseUrl() {
  return local ? 'http://localhost:3000' : 'https://api.jackkennedy.info';
}
