import React from 'react';
import Article from './Article';
import PropTypes from 'prop-types';

const Articles = ({ articles }) =>
  <div className="App">
    <div className="secwrapper">
      <section>{articles.map(article => (<Article article={article} />))}</section>
    </div>
  </div>;

Articles.PropTypes = {
  articles: PropTypes.arrayOf,
};
export default Articles;
