class NegociacaoController {

  constructor() { // estratégia que funciona como um cash, por percorret o DOM apenas uma vez
    let $ = document.querySelector.bind(document) // O bind faz referência para uma nova função-("faz ter um this"), então o querySelector tem como referência o objeto Document-(A função passa tem o objeto Document como this)
    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')

    let self = this

    this._listaNegociacoes = new Proxy(
      new ListaNegociacoes(), // Primeiro argumento do proxy é quem eu quero instanciar
      { // segindo paremetro do proxy é o "Handler" ("Objeto onde eu configuro as armadilhas")
        get( // o get sempre será chamado quando eu tentar ler uma propriedade do meu objeto
          target, // referencia ao objeto original que está sendo encapsulado pelo proxy
          prop, // propriedade que está sendo acessada
          receiver // referencia para o próprio proxy
        ){
          if (['setNegociacoes', 'clearNegociacoes'].includes(prop) && (typeof(target[prop]) == typeof(Function))) {
            return function () { // substituo o método do proxy por outro
              Reflect.apply(
                target[prop], // Função a ser executada
                target, // Contexto no qual a função vai ser executada
                arguments // Parametros da função
              )
              self._negociacoesView.update(target)
            }
          }

          return Reflect.get(target, prop, receiver) // valor retornado após a interceptação da propriedade de leitura
        }
      }
    )

    this._negociacoesView = new NegociacoesView($('#negociacoesView'))
    this._negociacoesView.update(this._listaNegociacoes)


    this._mensagem = new Mensagem()
    this._mensagemView = new MensagemView($('#mensagemView'), 'Alerta')
    this._mensagemView.update(this._mensagem)
  }

  adiciona (event) {
    event.preventDefault()

    //console.log(typeof(this._inputData.value)) // imprime o tipo do valor

    this._listaNegociacoes.setNegociacoes(this._criaNegociacao())

    this._mensagem.texto = 'Negociacao adicionada com sucesso'
    this._mensagemView.update(this._mensagem)
    this._limpaFormulario()
  }

  apaga () {
    this._listaNegociacoes.clearNegociacoes();

    this._mensagem.texto = 'Negociações apagadas com sucesso'
    this._mensagemView.update(this._mensagem)
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
