class Bind {

  constructor (model, view, ...props) {
    let proxy = ProxyFactory.create(
      model, // passando o obketo para o proxy
      props, // passando os parametros que eu quero interceptar
      (model => view.update(model)) // passando a ação que vou realizar
    )

    view.update(model) // chamando aqui por causa da primeira atualização da view
    return proxy
  }
}