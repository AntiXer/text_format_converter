import {combineReducers} from 'redux';
import changeLocale from './localeReducer';


const rootReducer = combineReducers(
    {
        localeStore: changeLocale
    }
)

export default rootReducer;