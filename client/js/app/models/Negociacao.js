class Negociacao {

  constructor (data, quantidade, valor) {
    this._data = new Date(data.getTime()) // "_" é uma convenção definindo que as propriedades que contenham _ só poderão ser acessadas pelos próprios métodos da classe
    this._quantidade = quantidade
    this._valor = valor  // atributos == propriedades
    Object.freeze(this)
  }

  get volume () { // Método desfaçado de atributo
    return this._quantidade * this._valor;
  }

  get data () {
    return new Date(this._data.getTime()) // Programação Defenciva - cria uma nova instancia para o objeto data e retorna ela
  }

  get quantidade () {
    return this._quantidade
  }

  get valor () {
    return this._valor
  }

}
