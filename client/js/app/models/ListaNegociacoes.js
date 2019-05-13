class ListaNegociacoes {

  constructor (armadilha, contexto) {
    this._negociacoes = []
    this._armadilha = armadilha
    this._contexto = contexto
  }

  get negociacoes () {
    return [].concat(this._negociacoes)
  }

  setNegociacoes (negociacao) {
    this._negociacoes.push(negociacao)
    Reflect.apply(
      this._armadilha, // Função a ser executada
      this._contexto, // Contexto no qual a função vai ser executada
      [this] // Parametros da função
    )
  }

  clearNegociacoes () {
    this._negociacoes = []
    Reflect.apply(this._armadilha, this._contexto, [this])
  }

}
