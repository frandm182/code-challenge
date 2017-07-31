import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from '../../request';
import { ARTICLE_QUERY, EDIT_QUERY, DELETE_QUERY } from '../../queries';

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      editMode: {
        author: true,
        title: true,
        excerpt: true,
        content: true
      }
    };
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onEditAuthor = this.onEditAuthor.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onEditTitle = this.onEditTitle.bind(this);
    this.onChangePublished = this.onChangePublished.bind(this);    
    this.onChangeExcerpt = this.onChangeExcerpt.bind(this);
    this.onEditExcerpt = this.onEditExcerpt.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onEditContent = this.onEditContent.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);    
  }

  componentWillMount() {
    let query = ARTICLE_QUERY;
    query = query.replace('#',this.props.match.params.id);
     request(query).then(response => {
      this.setState({ article: response.data.article });
    });
  }
  onChangeAuthor(e) {
    let newArticle = this.state.article;
    newArticle.author = e.target.value;
    this.setState({ article: newArticle });
  }
  onEditAuthor() {    
    let newEdit = this.state.editMode;
    newEdit.author = this.state.editMode.author ? false : true;
    this.setState({ editMode: newEdit });
  }
  onChangeTitle(e) {
    let newArticle = this.state.article;
    newArticle.title = e.target.value;
    this.setState({ article: newArticle });
  }
  onEditTitle() {    
    let newEdit = this.state.editMode;
    newEdit.title = this.state.editMode.title ? false : true;
    this.setState({ editMode: newEdit });
  }
  onChangeExcerpt(e) {
    let newArticle = this.state.article;
    newArticle.excerpt = e.target.value;
    this.setState({ article: newArticle });
  }
  onEditExcerpt() {
    let newEdit = this.state.editMode;
    newEdit.excerpt = this.state.editMode.excerpt ? false : true;
    this.setState({ editMode: newEdit });
  }
  onChangeContent(e) {
    let newArticle = this.state.article;
    newArticle.content = e.target.value;
    this.setState({ article: newArticle });
  }
  onEditContent() {    
    let newEdit = this.state.editMode;
    newEdit.content = this.state.editMode.content ? false : true;
    this.setState({ editMode: newEdit });
  }
  
  onChangePublished(e) {
    var newArticle = this.state.article;
    newArticle.published = this.state.article.published ? false : true;
    this.setState({ article: newArticle });
  }

  save() {
    let query = EDIT_QUERY;
    query = query.replace('#id',this.state.article.id);
    query = query.replace('#author',this.state.article.author);
    query = query.replace('#excerpt',this.state.article.excerpt.replace(/(\r\n|\n|\r)/gm,""));
    query = query.replace('#content',this.state.article.content.replace(/(\r\n|\n|\r)/gm,""));
    query = query.replace('#title',this.state.article.title);
    query = query.replace('#published',this.state.article.published);
     request(query).then(response => {
      console.log("created",response.data)
    });
  }

  delete() {
    let query = DELETE_QUERY;
    query = query.replace('#id',this.state.article.id);
    request(query).then(response => {
      console.log("deleted",response.data)
    });
  }
  render() {
    return (this.state.article ?
      <article>
        <div>
          <input type="text" disabled={this.state.editMode.author} value={this.state.article.author} onChange={this.onChangeAuthor} />{this.state.editMode.author? <span onClick={this.onEditAuthor}>edit</span>:<span onClick={this.onEditAuthor}>block</span>}
        </div>
        <div>
          <input type="text" disabled={this.state.editMode.title} value={this.state.article.title} onChange={this.onChangeTitle} />{this.state.editMode.title? <span onClick={this.onEditTitle}>edit</span>:<span onClick={this.onEditTitle}>block</span>}
        </div>
        <div>
          <textarea rows="4" cols="50"  disabled={this.state.editMode.excerpt} value={this.state.article.excerpt} onChange={this.onChangeExcerpt} />{this.state.editMode.excerpt? <span onClick={this.onEditExcerpt}>edit</span>:<span onClick={this.onEditExcerpt}>block</span>}
        </div>
        <div>
          <textarea rows="4" cols="50" disabled={this.state.editMode.content} value={this.state.article.content} onChange={this.onChangeContent} />{this.state.editMode.content? <span onClick={this.onEditContent}>edit</span>:<span onClick={this.onEditContent}>block</span>}

        </div>
         <div>
          <input type="checkbox" checked={this.state.article.published} onChange={this.onChangePublished}  />
        </div>
        <button onClick={this.save}>Save</button>
        <button onClick={this.delete}>Delete</button>
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
