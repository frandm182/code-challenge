import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ article }) =>
  <article>
    <h2>{article.title}</h2>
    <h1>{article.author}</h1>
    <p>{article.excerpt}</p>
    <a href="#" className="readmore">Read more</a>
  </article>;
Article.PropTypes = {
  article: PropTypes.objectOf,
};
export default Article;
