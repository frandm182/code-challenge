import {GET_ARTICLE, GET_ARTICLES, UPDATE_ARTICLE,SAVE_ARTICLE, DELETE_ARTICLE} from '../actions';
const initialState = {article:{},articles: []};
export function articleReducer(state=initialState, action) {
    switch(action.type) {
        case GET_ARTICLE:
            return {...state, article: action.payload};
        case GET_ARTICLES:
             return {...state, articles: [...action.payload]};
        case UPDATE_ARTICLE:
             const copyUpdate = Object.assign({}, action.payload);
             return {...state, article: copyUpdate};
        case SAVE_ARTICLE:
            const copySave = Object.assign({}, action.payload);
            console.log(copySave);
             return {...state, article: copySave};
        case DELETE_ARTICLE:
             return {...state, article: {}};
        default:
            return state
    }
}