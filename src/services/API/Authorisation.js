import { get, post, put, destroy } from '../Base/OcelotBase';

export const Authorisation = {
    // basic CRUD API usage
    authenticate: (parameters) =>
        post('/authorisation', parameters),
};