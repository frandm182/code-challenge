import React, { Component } from 'react';
import request from './request';
import { ARTICLES_QUERY } from './queries';
import Header from './components/header';
import Footer from './components/footer';

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
    const articles = this.state.articles.map(article => (<div className="album" key={article.id}><div>{article.title}</div><div>{article.author}</div><div >{article.excerpt}</div></div>));
    return (
      <div className="App">
        <Header />
        <div className="content">
          <h2>Billin code challenge</h2>
          <div>{articles}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
