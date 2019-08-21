import axios from "axios";
import {userService} from '../services/user.service';
const API_URL = process.env.REACT_APP_API_URL;

export const contactService = {
    save,
};

function save(phone, address, email, cv_id){
    const token = userService.isUserLogged().api_token;
    var formData = new FormData();
    formData.append("cv_id", cv_id);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("email", email);
    return axios.post(API_URL+"contact?token="+token, formData);
 }
