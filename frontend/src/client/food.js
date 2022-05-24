import { get, post } from "./request";

export function listRestaurantsAPI() {
    return get('get_restaurants');
}

export function listDishesAPI(restarauntName) {
    const url = 'get_dishes';
    const data = {'restaurant_name': restarauntName};
    return post(url, data);
}

export function get_user_details() {
    return get('get_user_info');
}