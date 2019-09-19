class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
    ])
      .then(list => list.reduce((arrayAchatado, array) => arrayAchatado.concat(array), []));
  }

  obterNegociacoesDaSemana() {
    return this._http.get('negociacoes/semana')
      .then(this._jsonParaNegociacoes)
      .catch(_ => 'Não foi possível obter as negociações da semana');
  }

  obterNegociacoesDaSemanaAnterior() {
    return this._http.get('negociacoes/anterior')
      .then(this._jsonParaNegociacoes)
      .catch(_ => 'Não foi possível obter as negociações da semana anterior');
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this._http.get('negociacoes/retrasada')
      .then(this._jsonParaNegociacoes)
      .catch(_ => 'Não foi possível obter as negociações da semana retrasada');
  }

  _jsonParaNegociacoes(lista) {
    return lista.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
  }
}
