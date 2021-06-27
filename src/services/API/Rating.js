import { get, post, put, destroy, patch } from '../Base/OcelotBase';
import jwt from "jsonwebtoken";

const id = () => {
    const token = localStorage.getItem("token");
    const secret = "Y2F0Y2hlciUyMHdvbmclMjBsb3ZlJTIwLm5ldA==";
    return token !== null ? jwt.verify(token.split("Bearer ").pop(), secret).id  : null
};

export const RatingAPI = {
    // basic CRUD API usage
    addRating: (parameters) =>
        post('/rating', {...parameters, userId: id()}),
    getAllRatings: () =>
        get(`/rating`),
    getRatingById: () =>
        get(`/rating/${id()}`),
    deleteRating: () =>
        destroy(`/rating/${id()}`),
    modifyRating: (id, parameters) =>
        patch(`/rating/${id}`, parameters),
    getRatingsByMovieId: (id) =>
        get(`/rating/movie/${id}`),
    getRatingsByUserId: () =>
        get(`/rating/user/${id()}`),
};