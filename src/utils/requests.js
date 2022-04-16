import axios from "axios";

class Requests {
  static BACKEND_URL = "/api/";

  static createMenu(onSuccess, onError) {
    axios
      .get(`${Requests.BACKEND_URL}menu`)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  }

  static addToMenu(id, orders, onSuccess, onError) {
    axios
      .post(`${Requests.BACKEND_URL}menu/${id}`, { orders })
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  }

  static getMenu(id, onSuccess, onError) {
    axios
      .get(`${Requests.BACKEND_URL}menu/${id}`)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  }
}

export default Requests;
