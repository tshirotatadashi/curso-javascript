export class ProxyFactory {

  static create (objeto, props, acao) {

    return new Proxy (
      objeto, // Primeiro argumento do proxy é quem eu quero instanciar
      { // segundo paremetro do proxy é o "Handler" ("Objeto onde eu configuro as armadilhas")

        get( // o get sempre será chamado quando eu tentar ler uma propriedade do meu objeto
          target, // referencia ao objeto original que está sendo encapsulado pelo proxy
          prop, // propriedade que está sendo acessada
          receiver // referencia para o próprio proxy
        ){
          if (props.includes(prop) && (typeof(target[prop]) == typeof(Function))) {
            return function () { // substituo o método do proxy por outro
              let retorno = Reflect.apply(
                target[prop], // Função a ser executada
                target, // Contexto no qual a função vai ser executada
                arguments // Parametros da função
              )
              acao(target)
              return retorno
            }
          }

          return Reflect.get(target, prop, receiver) // valor retornado após a interceptação da propriedade de leitura
        },

        set (target, prop, value, receiver) {
          let retorno = Reflect.set(target, prop, value, receiver) // Atribui o valor de acordo com o contexto
          if (props.includes(prop)) {
            acao(target)
          }
          return retorno // Nencessário retornar o valor
        }
      }
    )
  }
}