import { View } from './View'
import { DateHelper } from '../helpers/DateHelper'
import { currentInstance } from '../controllers/NegociacaoController'

export class NegociacoesView extends View {

  constructor (elemento) {
    super(elemento)
    elemento.addEventListener('click', function (event) {
      if (elemento.target.nodeName == 'TH')
        currentInstance().ordena(event.target.textContent.toLowerCase())
    })
  }

  template (model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
            <th>VOLUME</th>
          </tr>
        </thead>
        <tbody>
          ${model.negociacoes.map(item => `
            <tr>
              <td>${DateHelper.dataParaTexto(item.data)}</td>
              <td>${item.quantidade}</td>
              <td>${item.valor}</td>
              <td>${item.volume}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <td colspan='3'></td>
          <td>
            ${model.volumeTotal}
          </td>
        </tfoot>
      </table>
    `
  }
}
