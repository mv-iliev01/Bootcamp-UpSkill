﻿import axios from 'axios';
import { TokenManagement,  instance } from '../helpers';
import { baseUrl } from '../constants';

const apiUrl = baseUrl + 'api/Identity/';

const login = async (email, password) => {
    let data = instance
        .post(apiUrl + "Login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.jwt) {
                TokenManagement.setUser(response.data);
            }
           return response.data.jwt;
        });

   
    return data;
};

const logout = async () => {
    TokenManagement.removeUser();
    window.location.href="/";
   return;
    //todo url does not response to real url or method fault on BE
    return await axios
        .post(apiUrl + "logout")
        .then((data) => {
        },
            (err) => console.error(err));


};

const getUser = () => {
    return (localStorage.getItem('user')) || null;
}

export const userService = {
    login,
    logout,
    getUser,
};