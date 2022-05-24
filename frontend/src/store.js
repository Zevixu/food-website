import { createStore } from 'redux';
import rootReducer from './redux/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default () => {
    const persistConfig = {
        key: 'root',
        storage,
        blacklist: ['alart',]
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(persistedReducer);
    const persistor = persistStore(store);

    return { store, persistor }
}
