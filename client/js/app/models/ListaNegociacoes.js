class ListaNegociacoes {

  constructor () {
    this._negociacoes = []
  }

  get negociacoes () {
    return [].concat(this._negociacoes)
  }

  setNegociacoes (negociacao) {
    this._negociacoes.push(negociacao)
  }

  clearNegociacoes () {
    this._negociacoes = []
  }

  get volumeTotal () {
    return this._negociacoes.reduce((total, n) => total + n.volume, 0.0)
  }

}
