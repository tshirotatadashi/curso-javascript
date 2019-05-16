class NegociacaoService {

  constructor() {
    this._http = new HttpConnect()
  }

  obterNegociacoes () {
    return Promise.all([
      this.buscaSemana(),
      this.buscaSemanaAnterior(),
      this.buscaSemanaRetrasada()
    ]).then(negociacoes => {
        return negociacoes.flat(2)
      })
      .catch(erro => {throw new Error(erro)})
  }

  buscaSemana () {
    return this._http.get('negociacoes/semana')
      .then(negociacoes => {
        return negociacoes.map(objeto => new Negociacao(
          new Date(objeto.data),
          objeto.quantidade,
          objeto.valor)
        )
      })
      .catch(erro => {
        throw new Error('Não foi possível importar as negociações da semana')
      })
  }

  buscaSemanaAnterior () {
    return this._http.get('negociacoes/anterior')
      .then(negociacoes => {
        return negociacoes.map(objeto =>
          new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
        )
      })
      .catch(erro => {
        throw new Error('Não foi possível importar as negociações da semana anterior')
      })
  }

  buscaSemanaRetrasada () {
    return this._http.get('negociacoes/retrasada').then(negociacoes => {
      return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
    })
    .catch(erro => {
      throw new Error('Não foi possível importar as negociações da semana retrasada')
    })
  }
}
