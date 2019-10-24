const itemName = 'auth-token';

export default class TokenStore {
  setValue(token) {
    localStorage.setItem(itemName, token);
  }

  getValue() {
    return localStorage.getItem(itemName);
  }

  isDefined() {
    return !!this.getValue();
  }

  dropValue() {
    localStorage.removeItem(itemName);
  }
}

export const store = new TokenStore();
