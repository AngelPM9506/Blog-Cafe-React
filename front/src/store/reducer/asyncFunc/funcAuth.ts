import { LogInInput } from "src/types/login";
import axios from 'axios';

export const apiLogIn = (input: LogInInput) => {
    //console.log(input);
    //return input;
    const response = axios.post('/auth/login', input);
    console.log(response);

    return response;
}