import React from 'react';
import PropTypes from 'prop-types';

const ArticleForm = ({ match }) =>

match.params && match.params.id ?
  <article>
    <h2>{ match.params.id }</h2>
  </article> : <article />;

ArticleForm.PropTypes = {
  match: PropTypes.objectOf,
};
ArticleForm.default = {
  match: {},
};
export default ArticleForm;
