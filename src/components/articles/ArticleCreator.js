import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from '../../request';
import { CREATE_QUERY } from '../../queries';

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {author: '',title: '',content: '',excerpt: '',published: false},
      id: null,
      editMode: {
        author: true,
        title: true,
        excerpt: true,
        content: true
      },
      message: ''
    };
    this.setState({});
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePublished = this.onChangePublished.bind(this);    
    this.onChangeExcerpt = this.onChangeExcerpt.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.create = this.create.bind(this);
  }

  
  onChangeAuthor(e) {
    let newArticle = this.state.article;
    newArticle.author = e.target.value;
    this.setState({ article: newArticle });
  }
 
  onChangeTitle(e) {
    let newArticle = this.state.article;
    newArticle.title = e.target.value;
    this.setState({ article: newArticle });
  }
  
  onChangeExcerpt(e) {
    let newArticle = this.state.article;
    newArticle.excerpt = e.target.value;
    this.setState({ article: newArticle });
  }
  
  onChangeContent(e) {
    let newArticle = this.state.article;
    newArticle.content = e.target.value;
    this.setState({ article: newArticle });
  }
    
  onChangePublished(e) {
    var newArticle = this.state.article;
    newArticle.published = this.state.article.published ? false : true;
    this.setState({ article: newArticle });
  }

  showMessage(text) {
    this.setState({message: text})
    setTimeout(()=> this.setState({message: ''}),2000);
  }
  create() {
    let query = CREATE_QUERY;
    query = query.replace('#author',this.state.article.author);
    query = query.replace('#excerpt',this.state.article.excerpt.replace(/(\r\n|\n|\r)/gm,""));
    query = query.replace('#content',this.state.article.content.replace(/(\r\n|\n|\r)/gm,""));
    query = query.replace('#title',this.state.article.title);
    query = query.replace('#published',this.state.article.published);
     request(query).then(response => {
      console.log("created",response.data);
      this.showMessage("Article created");
    });
  }
  
  render() {
    return (this.state.article ?
      <article>
        <div>
          Author
          <input type="text" value={this.state.article.author} onChange={this.onChangeAuthor} ref="author" />
        </div>
        <div>
          Title
          <input type="text"  value={this.state.article.title} onChange={this.onChangeTitle} ref="title" />
        </div>
        <div>
          Excerpt
          <textarea rows="6" cols="50"   value={this.state.article.excerpt} onChange={this.onChangeExcerpt} ref="excerpt" />
        </div>
        <div>
          Content
          <textarea rows="6" cols="50"  value={this.state.article.content} onChange={this.onChangeContent}ref="content"  />
        </div>
         <div>
           Published
          <input type="checkbox" className="checkbox" checked={this.state.article.published} onChange={this.onChangePublished} ref="published"  />
        </div>        
        <button className="button update" onClick={this.create}>Create</button>
        <span>{this.state.message}</span>
      </article> : <article />);
  }
}

ArticleForm.PropTypes = {
  match: PropTypes.objectOf,
  create: PropTypes.bool
};
ArticleForm.default = {
  match: {},
  create: false
};
export default ArticleForm;
