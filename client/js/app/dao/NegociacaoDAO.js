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
}
