import axios from "axios";
import {userService} from '../services/user.service';
const API_URL = process.env.REACT_APP_API_URL;

export const competenceService = {
    save,
};

function save(title, cv_id){
    const token = userService.isUserLogged().api_token;
    var formData = new FormData();
    formData.append("title", title);
    formData.append("cv_id", cv_id);
    return axios.post(API_URL+"competence?token="+token, formData);
}
