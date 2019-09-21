class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._ordemAtual = '';

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto'
    );

    this._carregaTodasAsNegociacoes();
  }

  adiciona(event) {
    event.preventDefault();

    const negociacao = this._criaNegociacao();
    ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDAO(conn))
      .then(dao => dao.adiciona(negociacao))
      .then(() => {
          this._listaNegociacoes.adiciona(negociacao);
          this._mensagem.texto = 'Negociacao adicionada com sucesso';
          this._limpaFormulario();
      })
      .catch(_ => this._mensagem.texto = 'Não foi possível adicionar uma nova negociação.');
  }

  apaga() {
    ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDAO(conn))
      .then(dao => dao.apagaTodos())
      .then(() => {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso';
      })
      .catch(_ => this._mensagem.texto = 'Não foi possível apagar todas as negociações.');
  }

  importaNegociacoes() {
    let service = new NegociacaoService();

    service.obterNegociacoes()
      .then(negociacoes => {
        negociacoes
          .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações importadas com sucesso';
      })
      .catch(erro => this._mensagem.texto = erro);
  }

  ordena(coluna) {
    if (this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }

    this._ordemAtual = coluna;
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      parseInt(this._inputQuantidade.value, 10),
      parseFloat(this._inputValor.value)
    );
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0

    this._inputData.focus();
  }

  _carregaTodasAsNegociacoes() {
    ConnectionFactory.getConnection()
      .then(conn => new NegociacaoDAO(conn))
      .then(dao => dao.listaTodos())
      .then(negociacoes => negociacoes.forEach(this._listaNegociacoes.adiciona))
      .catch(_ => this._mensagem.texto = 'Não foi possível listar todas as negociações.');
  }
}
