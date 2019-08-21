import axios from "axios";
import {userService} from '../services/user.service';
const API_URL = process.env.REACT_APP_API_URL;

export const formationService = {
    save,
};

function save(degree, school, description, cv_id){
    const token = userService.isUserLogged().api_token;
    var formData = new FormData();
    formData.append("cv_id", cv_id);
    formData.append("degree", degree);
    formData.append("school", school);
    formData.append("description", description);
    return axios.post(API_URL+"formation?token="+token, formData);
 }
