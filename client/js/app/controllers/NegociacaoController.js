class NegociacaoController {

  constructor() { // estratégia que funciona como um cash, por percorret o DOM apenas uma vez
    let $ = document.querySelector.bind(document) // O bind faz referência para uma nova função-("faz ter um this"), então o querySelector tem como referência o objeto Document-(A função passa tem o objeto Document como this)
    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'setNegociacoes', 'clearNegociacoes', 'ordena', 'inverteOrdem'
    )

    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView'), 'Alerta'), 'texto')
    this._ordemAtual = ''
    this._service = new NegociacaoService()

    this._init()
  }

  _init () {
    this._service.listaNegociacoes()
      .then(negociacoes => negociacoes.map(negociacao =>
        this._listaNegociacoes.setNegociacoes(negociacao))
      )
      .catch(erro => this._mensagem.texto = erro)

    setInterval(() => {
      this.importaNegociacoes()
    }, 3000)
  }

  adiciona (event) {
    event.preventDefault()
    //console.log(typeof(this._inputData.value)) // imprime o tipo do valor

    let negociacao = this._criaNegociacao()
    this._service.salvaNegociacao(negociacao)
      .then(mensagem => {
        this._listaNegociacoes.setNegociacoes(negociacao)
        this._mensagem.texto = mensagem
        this._limpaFormulario()
      })
      .catch(erro => this._mensagem.texto = erro)
  }

  apaga () {
    this._service.removeNegociacao()
      .then(mensagem => {
        this._mensagem.texto = mensagem
        this._listaNegociacoes.clearNegociacoes();
      })
      .catch(erro => this._mensagem.texto = erro)
  }

  ordena (coluna) {
    if (this._ordemAtual == coluna )
      this._listaNegociacoes.inverteOrdem()
    else
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna])
    this._ordemAtual = coluna
  }

  importaNegociacoes () {
    this._service.importaNegociacoes(this._listaNegociacoes.negociacoes)
    .then(negociacoes => {
      negociacoes.map(negociacao => this._listaNegociacoes.setNegociacoes(negociacao))
      this._mensagem.texto = 'Negociações importadas com sucesso'
    })
    .catch(error => this._mensagem.texto = error)
  }

  _criaNegociacao () {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    )
  }

  _limpaFormulario () {
    this._inputData.value = ''
    this._inputQuantidade.value = 1
    this._inputValor.value = 0.0

    this._inputData.focus()

  }
}
