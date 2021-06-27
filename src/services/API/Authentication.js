import { get, post, put, destroy, patch } from '../Base/OcelotBase';
import jwt from "jsonwebtoken";

const id = () => {
    const token = localStorage.getItem("token");
    const secret = "Y2F0Y2hlciUyMHdvbmclMjBsb3ZlJTIwLm5ldA==";
    return token !== null ? jwt.verify(token.split("Bearer ").pop(), secret).id  : null
};

export const Authentication = {

    // basic CRUD API usage
    getAllUsers: () =>
        get('/authentication'),
    getUserById: () =>
        get(`/authentication/${id()}`),
    addUser: (parameters) =>
        post('/authentication', parameters),
    deleteUser: () =>
        destroy(`/authentication/${id()}`),
    modifyUser: (parameters) =>
        patch(`/authentication/${id()}`, parameters),
};