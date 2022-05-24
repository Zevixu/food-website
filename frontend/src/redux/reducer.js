import { LOGIN, LOGOUT, SHOW_ALART, DISMISS_ALART, FLIP_CLICK, CHANGE_NUMBER, REMOVE_ITEM, CHECK_ALL, APPEND_NEW_DISHES, DATACLEAN} from "./actionTypes";

const initialState = {
    login: false,
    alart: {
        show: false,
        variant: 'success',
        message: '',
    },
    dishes: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                login: true,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                login: false,
                dishes: [],
            }
        }
        case SHOW_ALART: {
            return {
                ...state,
                alart: {
                    show: true,
                    variant: action.payload.variant,
                    message: action.payload.message,
                },
            }
        }
        case DISMISS_ALART: {
            return {
                ...state,
                alart: {
                    show: false,
                },
            }
        }
        case FLIP_CLICK: {
            return {
                ...state,
                dishes: state.dishes.map((one, index) => {
                    if (index === action.payload) {
                        return {
                            ...one,
                            itemclick: !one.itemclick
                        }
                    }
                    return one
                }
                ),
            }
        }
        case CHANGE_NUMBER: {
            return {
                ...state,
                dishes: state.dishes.map((one, index) => {
                    if (index === action.payload.id) {
                        return {
                            ...one,
                            numbers: one.numbers + action.payload.count
                        }
                    }
                    return one
                }
                ),
            }
        }
        case REMOVE_ITEM: {
            return {
                ...state,
                dishes: state.dishes.map((one, index) => {
                    if (index === action.payload) {
                        return {
                            ...one,
                            numbers: 0
                        }
                    }
                    return one
                }
                ),
            }
        }
        case CHECK_ALL: {
            return {
                ...state,
                dishes: state.dishes.map(one => {
                    return {
                        ...one,
                        itemclick: action.payload
                    }
                }
                ),
            }
        }
        case APPEND_NEW_DISHES: {
            const newDishes = action.payload.map((dish) => {
                return {
                    name: dish.Name,
                    price: dish.Price,
                    restaurant: dish.Restaurant,
                    description: dish.Description,
                    calories: dish.Calories,
                    cuisine: dish.Cuisine,
                    numbers: 0,
                    itemclick: true,
                    src: dish.ImageUrl,
                };
            });
            return {
                ...state,
                dishes: state.dishes.concat(newDishes),
            };
        }
        case DATACLEAN:{
            return {
                ...state,
                dishes:[],
            };
        }
        default: {
            return state;
        }
    }
};

export default rootReducer;
