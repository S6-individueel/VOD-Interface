import { get, post, put, destroy } from '../Base/OcelotBase';

export const Movies = {
    // basic CRUD API usage
    topRated: () =>
        get('/movie/top-rated'),
};