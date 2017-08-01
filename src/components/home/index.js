import React, { Component } from 'react';
import Articles from '../articles/Articles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getArticles} from '../.././actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }
  componentDidMount() {
    this.props.getArticles();
  }
  render() {
    console.log("home", this.props.articles);
    return (
      <div>
        <Articles articleList={this.props.articles} />
      </div>
    );
  }
}
const mapStateToProps = state => { return {articles: state.articles.articles}}
const mapDispatchToProps = dispatch => bindActionCreators({getArticles},dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
