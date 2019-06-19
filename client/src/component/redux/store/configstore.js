import { combineReducers, createStore } from 'redux'
import userReducer from '../reducers/user'

const configureStore = () => {
    const store = createStore(combineReducers({
        users: userReducer
    }))
    return store
}

export default configureStore