import axios from "axios";
import {userService} from '../services/user.service';
const API_URL = process.env.REACT_APP_API_URL;
var user_id;
var token;

if( userService.isUserLogged()){
    user_id = userService.isUserLogged().id; //id of logged user
    token =  userService.isUserLogged().api_token; //token of logged user
}

export const cvService = {
    save,
    getCvs,
    deleteCv,
};

async function save(title, image){
    let settings = { headers: { 'content-type': 'multipart/form-data' } }
    var formData = new FormData();
    formData.append("title", title);
    if(image) formData.append("image", image); //if image is uploaded
    formData.append("user_id", user_id);
    return await axios.post(API_URL+"cv?token="+token, formData, settings);
}

async function getCvs(){
    var formData = new FormData();
    formData.append("user_id", user_id);
    //add GET as a paramater, cause somtimes, api doesn't answer properly to get method
    formData.append("_method", 'GET');
    return await axios.post(API_URL+"cvs?token="+token, formData);
}

async function deleteCv(cv_id){
    var formData = new FormData();
    formData.append("cv_id", cv_id);
    return await axios.post(API_URL+"cv/del?token="+token, formData);
}