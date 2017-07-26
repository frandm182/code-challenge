import React, { Component } from 'react';
import request from './request';
import { ARTICLES_QUERY } from './queries';
import Header from './components/header';
import Footer from './components/footer';
import Articles from './components/articles/Articles';

class App extends Component {
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
      <div className="App">
        <Header />
        <Articles articles={articles} />
        <Footer />
      </div>
    );
  }
}

export default App;
