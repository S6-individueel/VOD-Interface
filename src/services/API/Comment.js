import { get, post, put, destroy, patch } from '../Base/OcelotBase';
import jwt from "jsonwebtoken";

const id = () => {
    const token = localStorage.getItem("token");
    const secret = "Y2F0Y2hlciUyMHdvbmclMjBsb3ZlJTIwLm5ldA==";
    return token !== null ? jwt.verify(token.split("Bearer ").pop(), secret).id  : null
};

export const Comment = {
    // basic CRUD API usage
    addComment: (parameters) =>
        post('/comment', {...parameters, userId: id()}),
    getAllComments: () =>
        get(`/comment`),
    getCommentById: () =>
        get(`/comment/${id()}`),
    deleteComment: (id) =>
        destroy(`/comment/${id}`),
    modifyComment: (id, parameters) =>
        patch(`/comment/${id}`, parameters),
    getCommentsByMovieId: (id) =>
        get(`/comment/movie/${id}`),
    getCommentsByUserId: () =>
        get(`/comment/user/${id()}`),
};