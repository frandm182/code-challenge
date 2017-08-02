import { GET_ARTICLE, GET_ARTICLES, UPDATE_ARTICLE, SAVE_ARTICLE, DELETE_ARTICLE, CHANGE_ARTICLE, EMPTY_ARTICLE, CREATE_ARTICLE } from '../actions';

const initialState = { article: {}, articles: [] };
export function articleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLE:
      return { ...state, article: action.payload };
    case GET_ARTICLES:
      return { ...state, articles: [...action.payload] };
    case UPDATE_ARTICLE:
      const copyUpdate = Object.assign({}, action.payload);
      return { ...state, article: copyUpdate };
    case CREATE_ARTICLE:
      return { ...state, article: action.payload };
    case SAVE_ARTICLE:
      return state;
    case CHANGE_ARTICLE:
      const copyChange = Object.assign({}, action.payload);
      return { ...state, article: copyChange };
    case DELETE_ARTICLE:
      return { ...state, article: {} };
    case EMPTY_ARTICLE:
      return { ...state, article: {author: '', title: '', excerpt: '', content: '',tags:[]} };      
    default:
      return state;
  }
}
