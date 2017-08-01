import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getArticle, updateArticle, saveArticle} from '../.././actions';
import {DELETE_QUERY } from '../../queries';
import request from '../../request';
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
      },
      message: ''
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
      this.props.getArticle(this.props.match.params.id);      
  }
  onChangeAuthor(e) {
    let newArticle = this.props.article;
    newArticle.author = e.target.value;
    this.props.updateArticle(newArticle);
  }
  onEditAuthor() {    
    let newEdit = this.state.editMode;
    newEdit.author = this.state.editMode.author ? false : true;
    this.setState({ editMode: newEdit });
  }
  onChangeTitle(e) {
    let newArticle = this.props.article;
    newArticle.title = e.target.value;
    this.props.updateArticle(newArticle);
  }
  onEditTitle() {    
    let newEdit = this.state.editMode;
    newEdit.title = this.state.editMode.title ? false : true;
    this.setState({ editMode: newEdit });
  }
  onChangeExcerpt(e) {
    let newArticle = this.props.article;
    newArticle.excerpt = e.target.value;
    this.props.updateArticle(newArticle);
  }
  onEditExcerpt() {
    let newEdit = this.state.editMode;
    newEdit.excerpt = this.state.editMode.excerpt ? false : true;
    this.setState({ editMode: newEdit });
  }
  onChangeContent(e) {
    let newArticle = this.props.article;
    newArticle.content = e.target.value;
    this.props.updateArticle(newArticle);
  }
  onEditContent() {    
    let newEdit = this.state.editMode;
    newEdit.content = this.state.editMode.content ? false : true;
    this.setState({ editMode: newEdit });
  }
  
  onChangePublished(e) {
    var newArticle = this.props.article;
    newArticle.published = this.props.article.published ? false : true;
    this.props.updateArticle(newArticle);
  }

  showMessage(text) {
    this.setState({message: text})
    setTimeout(()=> this.setState({message: ''}),2000);
  }
  save() {
    this.props.saveArticle(this.props.article);
    this.showMessage("Article updated");
  }

  delete() {
    let query = DELETE_QUERY;
    query = query.replace('#id',this.props.article.id);
    request(query).then(response => {
      this.showMessage("Article removed");
      
    });
  }
  
  render() {
    return (this.props.article.author ?
      <article>
        <div>
          Author
          <input type="text" disabled={this.state.editMode.author} value={this.props.article.author} onChange={this.onChangeAuthor} />{this.state.editMode.author ? <span className="button" onClick={this.onEditAuthor}>edit</span>:<span className="button save" onClick={this.onEditAuthor}>save</span>}
        </div>
        <div>
          Title
          <input type="text" disabled={this.state.editMode.title} value={this.props.article.title} onChange={this.onChangeTitle} />{this.state.editMode.title ? <span className="button" onClick={this.onEditTitle}>edit</span>:<span className="button save" onClick={this.onEditTitle}>save</span>}
        </div>
        <div>
          Excerpt
          <textarea rows="6" cols="50"  disabled={this.state.editMode.excerpt} value={this.props.article.excerpt} onChange={this.onChangeExcerpt} />{this.state.editMode.excerpt? <span className="button" onClick={this.onEditExcerpt}>edit</span>:<span className="button save" onClick={this.onEditExcerpt}>save</span>}
        </div>
        <div>
          Content
          <textarea rows="6" cols="50" disabled={this.state.editMode.content} value={this.props.article.content} onChange={this.onChangeContent} />{this.state.editMode.content? <span className="button" onClick={this.onEditContent}>edit</span>:<span className="button save" onClick={this.onEditContent}>save</span>}
        </div>
         <div>
           Published
          <input type="checkbox" className="checkbox" checked={this.props.article.published} onChange={this.onChangePublished}  />
        </div>
        <button className="button update" onClick={this.save}>Update</button><button  className="button delete" onClick={this.delete}>Delete</button>       
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

const mapStateToProps = state => { return {article: state.articles.article}}
const mapDispatchToProps = dispatch => bindActionCreators({getArticle,updateArticle,saveArticle},dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);
