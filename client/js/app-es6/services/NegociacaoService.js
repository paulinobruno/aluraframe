import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { NegociacaoDAO } from '../dao/NegociacaoDAO';
import { Negociacao } from '../models/Negociacao';

export class NegociacaoService {
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

  cadastra(negociacao) {
    return ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDAO(conn))
      .then(dao => dao.adiciona(negociacao))
      .then(() => 'Negociacao adicionada com sucesso')
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível adicionar uma nova negociação.');
      });
  }

  apaga() {
    return ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDAO(conn))
      .then(dao => dao.apagaTodos())
      .then(() => 'Negociações apagadas com sucesso')
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível listar todas as negociações.');
      });
  }

  lista() {
    return ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDAO(conn))
      .then(dao => dao.listaTodos())
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível listar todas as negociações.');
      });
  }

  importa(listaAtual) {
    return this.obterNegociacoes()
      .then(negociacoes =>
        negociacoes.filter(negociacao =>
          !listaAtual.some(negociacaoExistente => negociacao.isEquals(negociacaoExistente))
        )
      )
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível importar as negociações');
      });
  }

  _jsonParaNegociacoes(lista) {
    return lista.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
  }
}
