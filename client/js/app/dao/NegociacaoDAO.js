class NegociacaoDAO {
  constructor(connection) {
    this._conn = connection;
    this._store = 'negociacoes';
  }

  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      const request = this._conn
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(negociacao);

      request.onsuccess = e => {
        resolve();
      };

      request.onerror = e => {
        const { error } = e.target;

        console.log(error);
        reject(error.name);
      };
    });
  }

  listaTodos() {
    return new Promise((resolve, reject) => {
      const cursor = this._conn
        .transaction([this._store], 'readonly')
        .objectStore(this._store)
        .openCursor();

      const negociacoes = [];
      cursor.onsuccess = e => {
        const atual = e.target.result;

        if (atual) {
          const dado = atual.value;
          negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
          atual.continue();
        } else {
          resolve(negociacoes);
        }
      };

      cursor.onerror = e => {
        const { error } = e.target;

        console.log(error);
        reject(error.name);
      };
    });
  }
}
