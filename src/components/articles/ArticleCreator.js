import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getArticle, updateArticle, saveArticle, changeArticle, getEmptyArticle, createArticle } from '../.././actions';
import Tags from '../tags';

class ArticleCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      message: '',
      isCreating: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showMessage = this.showMessage.bind(this); 
    this.onRemoveTag = this.onRemoveTag.bind(this);  
    this.onAddClick = this.onAddClick.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillMount() {
    this.props.getEmptyArticle();
  }

  handleSubmit() {
    const article = {
      author: findDOMNode(this.refs.author).value,
      title: findDOMNode(this.refs.title).value,
      excerpt: findDOMNode(this.refs.excerpt).value,
      content: findDOMNode(this.refs.content).value, 
      published: this.refs.published.checked,
      tags: this.props.article.tags ? this.props.article.tags : []   
    };
    this.props.createArticle(article);
    this.setState({editMode: !this.state.editMode});
    this.showMessage("Article created");
     setTimeout(() => this.props.history.push('/'),1000);
  } 
  showMessage(text) {
    this.setState({message: text})
    setTimeout(()=> this.setState({message: ''}),2000);
  }

  onRemoveTag(text) {
    const newArticle = Object.assign({}, this.props.article);
    const index = newArticle.tags.findIndex(t => t === text);
    const tags = newArticle.tags;
    newArticle.tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    this.props.changeArticle(newArticle);
  }

  onAddClick() {
    this.setState(() => ({
      isCreating: true
    }));
  }
  
  onKeyPress(event) {
    if (event.which === 13) {
      this.setState(() => ({
        isCreating: false
      }));
      const newArticle = Object.assign({}, this.props.article);
      
      newArticle.author = this.props.article.author ? this.props.article.author : '';
      newArticle.title = this.props.article.title ? this.props.article.title : '';
      newArticle.excerpt = this.props.article.excerpt ? this.props.article.excerpt : '';
      newArticle.content = this.props.article.content ? this.props.article.content : '';
      newArticle.published = this.props.article.content ? true : false;
      newArticle.tags = this.props.article.tags ? this.props.article.tags.concat(event.currentTarget.value) : [event.currentTarget.value];
      this.props.changeArticle(newArticle);
    }
  }
  onChangeInput() {
    const article = {
      id: this.props.article.id,
      author: findDOMNode(this.refs.author).value,
      title: findDOMNode(this.refs.title).value,
      excerpt: findDOMNode(this.refs.excerpt).value,
      content: findDOMNode(this.refs.content).value, 
      published: this.refs.published.checked,
      tags: this.props.article.tags  
    };
    this.props.changeArticle(article);
  }

  
  render() {
    const tags = this.props.article && this.props.article.tags && this.props.article.tags.map((tag, i) =>
      <Tags key={i}  onRemoveClick={this.onRemoveTag}>{tag}</Tags>);
    return (this.props.article ?
      <article>
        <div>
          Author
          <input type="text"  value={this.props.article.author} onChange={this.onChangeInput} ref="author"/>
        </div>
        <div>
          Title
          <input type="text"  value={this.props.article.title} onChange={this.onChangeInput}  ref="title" />
        </div>
        <div>
          Excerpt
          <textarea rows="6" cols="50"   value={this.props.article.excerpt} onChange={this.onChangeInput}   ref="excerpt" />
        </div>
        <div>
          Content
          <textarea rows="6" cols="50"  value={this.props.article.content} onChange={this.onChangeInput}   ref="content" />
        </div>
         <div>
           Published
          <input type="checkbox"  className="checkbox" checked={this.props.article.published} onChange={this.onChangeInput}   ref="published" />
        </div>
        <div>
          <ul className="tags">
            {tags}  
          </ul>
          {
              this.state.isCreating ? 
                <input type="text"
                  onKeyPress={this.onKeyPress}
                />
              : <div className="plusButton" onClick={this.onAddClick}>
                  +
                </div> 
            }
        </div>
          <div><span className="button" onClick={this.handleSubmit}>Create</span></div>  
        <span>{this.state.message}</span>
      </article> : <article />);
  }
}

ArticleCreator.PropTypes = {
  match: PropTypes.objectOf,
  create: PropTypes.bool
};
ArticleCreator.default = {
  match: {},
  create: false
};
const mapStateToProps = state => { return {article: state.articles.article}}
const mapDispatchToProps = dispatch => bindActionCreators({getArticle,updateArticle,saveArticle,changeArticle,getEmptyArticle, createArticle },dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreator);
