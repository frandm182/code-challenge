import React, { Component } from 'react';
import request from '../../request';
import { ARTICLES_QUERY } from '../../queries';
import Articles from '../articles/Articles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }
  componentWillMount() {
    request(ARTICLES_QUERY).then(response => {
      this.setState({ articles: response.data.articles });
    });
  }
  render() {
    const { articles } = this.state;
    return (
      <div>
        <Articles articleList={articles} />
      </div>
    );
  }
}

export default Home;
