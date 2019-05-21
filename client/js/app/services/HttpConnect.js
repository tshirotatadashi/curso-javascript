class HttpConnect {

  _handleErrors (res) {
    if (!res.ok) throw new Error(res.statusText)
    return res
  }

  get (url) {
    return fetch(url)
      .then(res => this._handleErrors(res))
      .then(res => res.json())
  }

  post (url, payload, headers) {
    return fetch(url, {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(res => this._handleErrors(res))
  }

}