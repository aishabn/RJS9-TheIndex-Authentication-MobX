import { decorate, observable, computed } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class authStore {
  constructor() {
    this.user = {};
  }

  setAuthToken(token) {
    if (token) {
      localStorage.setItem("Token", token);
      axios.defaults.headers.common.Authorization = `jwt ${token}`;
    } else {
      localStorage.removeItem("Token");
      delete axios.defaults.headers.common.Authorization;
    }
  }

  checkToken() {
    const token = localStorage.getItem("Token");
    if (token) {
      const user = jwt_decode(token);
      if (user.exp > Date.now() / 1000) {
        this.setAuthToken(user.token);
        const decodedUser = jwt_decode(user.token);
        this.user = decodedUser;
      } else {
        this.logoutUser();
      }
    }
  }

  loginUser(userData, history) {
    instance
      .post("/login/", userData)
      .then(res => res.data)
      .then(user => {
        console.log(user);
        this.setAuthToken(user.token);
        const decodedUser = jwt_decode(user.token);
        this.user = decodedUser;
        history.replace("/");
      })
      .catch(err => console.error(err.response));
  }

  signupUser(userData, history) {
    instance
      .post("/signup/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        this.user = decodedUser;
        this.setAuthToken(user.token);
        history.replace("/");
      })
      .catch(err => console.error(err.response));
  }

  logoutUser() {
    this.user = null;
    this.setAuthToken();
  }
}

decorate(authStore, {
  user: observable
});
const AuthStore = new authStore();
AuthStore.checkToken();
export default AuthStore;
