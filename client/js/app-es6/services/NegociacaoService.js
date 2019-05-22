import { HttpConnect } from './HttpConnect'
import { Negociacao } from '../models/Negociacao'
import { ConnectionFactory } from './ConnectionFactory'
import { NegociacaoDao } from '../dao/NegociacaoDao'

export class NegociacaoService {

  constructor() {
    this._http = new HttpConnect()
    this._connection = ConnectionFactory.getConnection()
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

  salvaNegociacao (negociacao) {
    return this._connection
      .then(conexao => new NegociacaoDao(conexao))
      .then(dao => dao.adiciona(negociacao))
      .then(() => 'Negociacao adicionada com sucesso')
      .catch(erro => { throw new Error(erro)})
  }

  removeNegociacao () {
    return this._connection
      .then(conexao => new NegociacaoDao(conexao))
      .then(dao => dao.apagaTodos())
      .catch(erro => {throw new Error(erro)})
  }

  listaNegociacoes () {
    return this._connection
      .then(conexao => new NegociacaoDao(conexao))
      .then(dao => dao.listaTodos())
      .catch(erro => {throw new Error(erro)})
  }

  importaNegociacoes (listaAtual) {
    return this.obterNegociacoes().then(negociacoes =>
      negociacoes.filter(negociacao =>
        !listaAtual.some(negociacaoExistente =>
          negociacao.isEquals(negociacaoExistente)
        ))
    )
  }
}
