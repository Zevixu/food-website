import { post } from './request';

export function signUpAPI(data) {
    const url = 'signup';
    return post(url, data);
}

export function loginAPI(data) {
    const url = 'login';
    return post(url, data);
}

export function logoutAPI() {
    const url = 'logout';
    return post(url, {});
}
