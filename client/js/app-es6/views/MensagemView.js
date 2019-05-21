class MensagemView extends View {

  constructor (elemento, tipo) {
    super (elemento)
    this._tipo = tipo
  }

  template (model) {
    return model.texto ? `<p class="alert alert-info">${this._tipo}: ${model.texto}</p>` : '<p></p>'
  }
}
