import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from '../../request';
import { ARTICLE_QUERY } from '../../queries';

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }

  componentWillMount() {
    let query = ARTICLE_QUERY;
    query = query.replace('#',this.props.match.params.id);
     request(query).then(response => {
      this.setState({ article: response.data.article });
    });
  }

  render() {
    return (this.state.id ?
      <article>
        <h2>{ this.state.id }</h2>
      </article> : <article />);
  }
}

ArticleForm.PropTypes = {
  match: PropTypes.objectOf,
};
ArticleForm.default = {
  match: {},
};
export default ArticleForm;
