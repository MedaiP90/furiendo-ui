import axios from "axios";

class Requests {
  static createMenu(onSuccess, onError) {
    Requests.createMenu_netlify(onSuccess, onError);
  }

  static addToMenu(id, orders, onSuccess, onError) {
    Requests.addToMenu_netlify(id, orders, onSuccess, onError);
  }

  static getMenu(id, onSuccess, onError) {
    Requests.getMenu_netlify(id, onSuccess, onError);
  }

  /* NETLIFY */

  static NETLIFY_BACKEND_URL =
    process.env.NODE_ENV !== "development"
      ? "/.netlify/functions/server/"
      : "/";

  static createMenu_netlify(onSuccess, onError) {
    axios
      .get(`${Requests.NETLIFY_BACKEND_URL}menu`)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  }

  static addToMenu_netlify(id, orders, onSuccess, onError) {
    axios
      .post(`${Requests.NETLIFY_BACKEND_URL}menu/${id}`, { orders })
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  }

  static getMenu_netlify(id, onSuccess, onError) {
    axios
      .get(`${Requests.NETLIFY_BACKEND_URL}menu/${id}`)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  }
}

export default Requests;
