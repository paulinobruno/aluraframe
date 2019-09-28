import PubSub from 'pubsub-js';

export default class TratadorErros {
  publicaErros(resposta) {
    resposta.errors
      .forEach(error => PubSub.publish('erro-validacao', error));
  }
}
