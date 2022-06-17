import axios from "axios";

class Requests {
  static createMenu(onSuccess, onError) {
    Requests.createMenu_vercel(onSuccess, onError);
  }

  static addToMenu(id, orders, onSuccess, onError) {
    Requests.addToMenu_vercel(id, orders, onSuccess, onError);
  }

  static getMenu(id, onSuccess, onError) {
    Requests.getMenu_vercel(id, onSuccess, onError);
  }

  /* VERCEL */

  static BACKEND_URL_1 = "/api/";

  static createMenu_vercel(onSuccess, onError) {
    axios
      .get(`${Requests.BACKEND_URL_1}menu`)
      .then((res) => onSuccess(res))
      .catch(() => Requests.createMenu_netlify(onSuccess, onError));
  }

  static addToMenu_vercel(id, orders, onSuccess, onError) {
    axios
      .post(`${Requests.BACKEND_URL_1}menu/${id}`, { orders })
      .then((res) => onSuccess(res))
      .catch(() => Requests.addToMenu_netlify(id, orders, onSuccess, onError));
  }

  static getMenu_vercel(id, onSuccess, onError) {
    axios
      .get(`${Requests.BACKEND_URL_1}menu/${id}`)
      .then((res) => onSuccess(res))
      .catch(() => Requests.getMenu_netlify(id, onSuccess, onError));
  }

  /* NETLIFY */

  static BACKEND_URL_2 = "/.netlify/functions/server/";

  static createMenu_netlify(onSuccess, onError) {
    axios
      .get(`${Requests.BACKEND_URL_2}menu`)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  }

  static addToMenu_netlify(id, orders, onSuccess, onError) {
    axios
      .post(`${Requests.BACKEND_URL_2}menu/${id}`, { orders })
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  }

  static getMenu_netlify(id, onSuccess, onError) {
    axios
      .get(`${Requests.BACKEND_URL_2}menu/${id}`)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  }
}

export default Requests;
