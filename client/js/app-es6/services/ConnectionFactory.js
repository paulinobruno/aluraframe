const dbName = 'aluraframe';
const dbVersion = 3;
const stores = ['negociacoes'];

let openedConnection;

export class ConnectionFactory {
  constructor() {
    throw new Error('Não é possível criar instâncias de ConnectionFactory');
  }

  static getConnection() {
    if (openedConnection) {
      return Promise.resolve(openedConnection.ref);
    }

    return new Promise((resolve, reject) => {
      let openRequest = window.indexedDB.open(dbName, dbVersion);

      openRequest.onupgradeneeded = e => {
        ConnectionFactory._createStores(e.target.result);
      };

      openRequest.onsuccess = e => {
        const conn = e.target.result;

        openedConnection = {
          ref: conn,
          close: conn.close.bind(conn)
        };

        conn.close = () => { throw new Error('Não é possível fechar a conexão diretamente.') };
        resolve(openedConnection.ref);
      };

      openRequest.onerror = e => {
        const { error } = e.target;

        console.log('Erro ao tentar obter conexão com o IndexedDB.', error);
        reject(error.name);
      };
    });
  }

  static closeConnection() {
    if (openedConnection) {
      openedConnection.close();
      openedConnection = null;
    }
  }

  static _createStores(conn) {
    stores.forEach(name => {
      if (conn.objectStoreNames.contains(name)) {
        conn.deleteObjectStore(name);
      }

      conn.createObjectStore(name, { autoIncrement: true });
    });
  }
}
