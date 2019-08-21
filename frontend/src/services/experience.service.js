import axios from "axios";
import {userService} from '../services/user.service';
const API_URL = process.env.REACT_APP_API_URL;

export const experienceService = {
    save,
};

function save(job_title, company, description, cv_id){
    const token = userService.isUserLogged().api_token;
    var formData = new FormData();
    formData.append("cv_id", cv_id);
    formData.append("job_title", job_title);
    formData.append("company", company);
    formData.append("description", description);
    return axios.post(API_URL+"experience?token="+token, formData);
 }
