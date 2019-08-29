import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const userService = {
  login,
  register,
  logout,
  isUserLogged,
};

function login(email, password){
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return axios.post(API_URL+"login", formData)
}

function register(name, email, password){
    var formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", name);

    return axios.post(API_URL+"register", formData)
};
  
  // delete user data from browser local storag
  function logout(){
    localStorage.removeItem('user');
    window.location.href = "/login";
  };

  // get user data if user already is logged
  function isUserLogged(){
    return JSON.parse(localStorage.getItem('user'));
  }