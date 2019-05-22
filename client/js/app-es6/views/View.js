export class View {
  constructor (elemento) {
    this._elemento = elemento
  }

  template () {
    throw new Error('Você precisa passar um template')
  }

  update (model) {
    this._elemento.innerHTML = this.template(model)
  }
}
