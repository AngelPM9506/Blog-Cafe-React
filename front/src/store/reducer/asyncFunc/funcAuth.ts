import { LogInInput } from "src/types/login";
import axios from 'axios';

export const apiLogIn = async (input: LogInInput) => {
    //console.log(input);
    //return input;
    const response = await axios.post('/auth/login', input);
    //console.log(response);

    return response;
}