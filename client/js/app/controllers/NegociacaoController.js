class NegociacaoController {

  constructor() { // estratégia que funciona como um cash, por percorret o DOM apenas uma vez
    let $ = document.querySelector.bind(document) // O bind faz referência para uma nova função-("faz ter um this"), então o querySelector tem como referência o objeto Document-(A função passa tem o objeto Document como this)
    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')
    this._listaNegociacoes = new ListaNegociacoes()
  }

  adiciona (event) {
    event.preventDefault()

    //console.log(typeof(this._inputData.value)) // imprime o tipo do valor

    this._listaNegociacoes.setNegociacoes(this._criaNegociacao())
    this._limpaFormulario()
    console.log(this._listaNegociacoes.negociacoes)

  }

  _criaNegociacao () {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    )
  }

  _limpaFormulario () {
    this._inputData.value = ''
    this._inputQuantidade.value = 1
    this._inputValor.value = 0.0

    this._inputData.focus()

  }
}
