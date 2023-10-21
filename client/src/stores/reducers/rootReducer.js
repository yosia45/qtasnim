import {combineReducers} from 'redux'
import itemReducer from './itemReducer' 
import typeReducer from './typeReducer'

const rootReducer = combineReducers({
    item: itemReducer,
    type: typeReducer
})

export default rootReducer