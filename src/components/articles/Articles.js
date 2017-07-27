import React from 'react';
import Article from './Article';
import PropTypes from 'prop-types';

const Articles = ({ articleList }) =>
  <div className="secwrapper">
    <section>{articleList.map(article => (<Article key={article.id} article={article} />))}</section>
  </div>;

Articles.PropTypes = {
  articles: PropTypes.arrayOf,
};
export default Articles;
