
import request from '../request';
import { ARTICLE_QUERY, ARTICLES_QUERY, EDIT_QUERY, DELETE_QUERY } from '../queries';

export const GET_ARTICLE = 'GET_ARTICLE';
export const GET_ARTICLES = 'GET_ARTICLES';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const SAVE_ARTICLE = 'SAVE_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const CHANGE_ARTICLE = 'CHANGE_ARTICLE';

export function getArticle(id) {
  let query = ARTICLE_QUERY;
  query = query.replace('#', id);
  return dispatch => {
    request(query)
        .then(response => { dispatch({ type: GET_ARTICLE, payload: response.data.article }); });
  };
}

export function getArticles() {
  return dispatch => {
    request(ARTICLES_QUERY)
        .then(response => {
          dispatch({
            type: GET_ARTICLES,
            payload: response.data.articles });
        });
  };
}

export function updateArticle(article) {
  return {
    type: UPDATE_ARTICLE,
    payload: article,
  };
}

export function changeArticle(article) {
  return {
    type: CHANGE_ARTICLE,
    payload: article,
  };

}


export function saveArticle(article) {
  let query = EDIT_QUERY;
  query = query.replace('#id', article.id);
  query = query.replace('#author', article.author);
  query = query.replace('#excerpt', article.excerpt.replace(/(\r\n|\n|\r)/gm, ''));
  query = query.replace('#content', article.content.replace(/(\r\n|\n|\r)/gm, ''));
  query = query.replace('#title', article.title);
  query = query.replace('#published', article.published);
  query = query.replace('#tags', JSON.stringify(article.tags));
  return dispatch => {
    request(query)
        .then(response => {
          dispatch({
            type: SAVE_ARTICLE,
            payload: response.data.articles });
        });
  };
}
export function deleteArticle(id) {
  let query = DELETE_QUERY;
  query = query.replace('#id', id);
  return dispatch => {
    request(query).then(response => {
      dispatch({
        type: DELETE_ARTICLE,
        payload: response.data.article,
      });
    });
  };

}

