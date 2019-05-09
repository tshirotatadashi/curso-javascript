class NegociacaoController {

  constructor() { // estratégia que funciona como um cash, por percorret o DOM apenas uma vez
    let $ = document.querySelector.bind(document) // O bind faz referência para uma nova função-("faz ter um this"), então o querySelector tem como referência o objeto Document-(A função passa tem o objeto Document como this)
    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')
  }

  adiciona (event) {
    event.preventDefault()

    //console.log(typeof(this._inputData.value)) // imprime o tipo do valor

    let data = new Date(
      ...this._inputData.value // adicionando um "Spread Operator" para indicar que o array será desmembrado
        .split('-') // transforma a string em um array usando a função split e usando o "-" como critério de separação
        .map((item, index) => item - index % 2)
    )

    let negociacao = new Negociacao(
      data,
      this._inputQuantidade.value,
      this._inputValor.value
    )

    console.log(negociacao)
  }
}
