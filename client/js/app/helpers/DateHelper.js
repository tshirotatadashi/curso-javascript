class DateHelper {

  constructor () {
    throw new Error('Está classe não pode ser instanciada')
  }

  static dataParaTexto (data) { // definindo que esse método pode ser acessado diretamente da classe, não precisando criar uma instância
    return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}` // usando "Template String" ``
  }

  static textoParaData (texto) {

    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) throw new Error('A data deve ser no formato AAAA-MM-dd')

    return new Date(
      ...texto // adicionando um "Spread Operator" para indicar que o array será desmembrado
        .split('-') // transforma a string em um array usando a função split e usando o "-" como critério de separação
        .map((item, index) => item - index % 2)
    )
  }


}
