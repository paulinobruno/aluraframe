export class View {
  constructor(elemento) {
    this._elemento = elemento;
  }

  template(_) {
    throw new Error('O metodo #template precisa ser implementado');
  }

  update(model) {
    this._elemento.innerHTML = this.template(model);
  }
}
