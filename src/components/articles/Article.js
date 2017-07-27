import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom'
;

const Article = ({ article }) =>
  <article>
    <h2>{article.title}</h2>
    <h1>{article.author}</h1>
    <p>{article.excerpt}</p>
    <Link to={{ pathname: `/article/${article.id}`, params: { id: article.id } }}>Read more</Link>
  </article>;

Article.PropTypes = {
  article: PropTypes.objectOf,
  match: PropTypes.objectOf,
};
Article.default = {
  article: {},
  match: {},
};
export default Article;
