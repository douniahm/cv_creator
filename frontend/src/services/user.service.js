import axios from "axios";
import { createBrowserHistory } from "history";
const API_URL = process.env.REACT_APP_API_URL;

const history = createBrowserHistory();
export const userService = {
  login,
  register,
  logout,
  isUserLogged
};

function login(email, password){
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post(API_URL+"login", formData)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          const { name, id, email, auth_token } = json.data.data;
          let userData = {
            name,
            id,
            email,
            auth_token,
            timestamp: new Date().toString()
          };
          // save user data in browser local storage
          localStorage["user"] = JSON.stringify(userData);
          return true;
        } else return false;
      })
      .catch(error => {
        return false;
      });
  };

function register(name, email, password){
    var formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", name);

    axios
      .post(API_URL+"register", formData)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          const { name, id, email, auth_token } = json.data.data;
          let userData = {
            name,
            id,
            email,
            auth_token,
            timestamp: new Date().toString()
          };
          // save user data in browser local storage
          localStorage["user"] = JSON.stringify(userData);
          //redirection
          history.push("/");
        } else {
          alert(`Registration Failed!`);
        }
      })
      .catch(error => {
        alert("An Error Occured!" + error);
        console.log(`${formData} ${error}`);
      });
  };
  
    // delete user data from browser local storag
  function logout(){
    localStorage.removeItem('user');
  };

  // get user data if user already is logged
function isUserLogged(){
    return localStorage.getItem('userDate');
}