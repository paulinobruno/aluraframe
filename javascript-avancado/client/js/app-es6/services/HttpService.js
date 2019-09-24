export class HttpService {
  get(url) {
    return fetch(url)
      .then(this._handleErrors)
      .then(res => res.json());
  }

  post(url, dado) {
    return fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify(dado)
    })
      .then(this._handleErrors);
  }

  _handleErrors(res) {
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res;
  }
}
