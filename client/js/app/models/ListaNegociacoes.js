class ListaNegociacoes {

  constructor () {
    this._negociacoes = []
  }

  get negociacoes() {
    return [].concat(this._negociacoes)
  }

  setNegociacoes(negociacao) {
    this._negociacoes.push(negociacao)
  }

}
