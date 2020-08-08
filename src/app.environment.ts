const local = false;

export function baseUrl() {
  return local ? 'http://localhost:3000' : 'https://api.mychannel.rocks';
}

export function isLocal() {
  return local;
}
