import axios from "axios";
import {userService} from '../services/user.service';
const API_URL = process.env.REACT_APP_API_URL;

export const cvService = {
    save,
};

async function save(title){
    const user = userService.isUserLogged();
    const id = user.id;
    const token = user.api_token;
    var formData = new FormData();
    formData.append("title", title);
    formData.append("user_id", id);
    return await axios.post(API_URL+"cv?token="+token, formData);
}
