const local = false;

export function baseUrl() {
  console.log('baseUrl: local:' + local);
  return local ? 'http://localhost:3000' : 'https://api.jackkennedy.info';
}
