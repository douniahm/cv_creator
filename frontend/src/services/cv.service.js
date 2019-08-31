import axios from "axios";
import {userService} from '../services/user.service';
const API_URL = process.env.REACT_APP_API_URL;

export const cvService = {
    save,
    getCv,
    getCvs,
    deleteCv,
};

async function save(title, image){
    const user = userService.isUserLogged();
    const id = user.id;
    const token = user.api_token;
    let settings = { headers: { 'content-type': 'multipart/form-data' } }
    var formData = new FormData();
    formData.append("title", title);
    if(image) formData.append("image", image); //if image is uploaded
    formData.append("user_id", id);
    return await axios.post(API_URL+"cv?token="+token, formData, settings);
}

async function getCv(cv_id){
    const user = userService.isUserLogged();
    const token = user.api_token;
    var formData = new FormData();
    formData.append("id", cv_id);
    return await axios.get(API_URL+"cvs?token="+token, formData);
}

async function getCvs(){
    const user = userService.isUserLogged();
    const id = user.id;
    const token = user.api_token;
    var formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("user", id);
    return await axios.get(API_URL+"cvs?token="+token, formData);
}

async function deleteCv(cv_id){
    const user = userService.isUserLogged();
    const token = user.api_token;
    var formData = new FormData();
    formData.append("cv_id", cv_id);
    return await axios.post(API_URL+"cv/del?token="+token, formData);
}