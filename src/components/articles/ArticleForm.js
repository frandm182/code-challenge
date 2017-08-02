import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {getArticle, updateArticle, saveArticle, changeArticle} from '../.././actions';
import {DELETE_QUERY } from '../../queries';
import request from '../../request';
import Tags from '../tags';

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      editMode: false,
      message: '',
      isCreating: false
    };
    this.onEdit = this.onEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.delete = this.delete.bind(this);  
    this.onRemoveTag = this.onRemoveTag.bind(this);    
    this.onChangeInput = this.onChangeInput.bind(this); 
    this.onAddClick = this.onAddClick.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillMount() {   
      this.props.getArticle(this.props.match.params.id);      
  }


  handleSubmit() {
    const article = {
      id: this.props.article.id,
      author: findDOMNode(this.refs.author).value,
      title: findDOMNode(this.refs.title).value,
      excerpt: findDOMNode(this.refs.excerpt).value,
      content: findDOMNode(this.refs.content).value, 
      published: this.refs.published.checked,
      tags: this.props.article.tags  
    };
    this.props.saveArticle(article);
    this.setState({editMode: !this.state.editMode});
    this.showMessage("Article updated");
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

   onEdit() {
    this.setState({editMode: !this.state.editMode});
  }

  showMessage(text) {
    this.setState({message: text})
    setTimeout(()=> this.setState({message: ''}),2000);
  }
 

  delete() {
    let query = DELETE_QUERY;
    query = query.replace('#id',this.props.article.id);
    request(query).then(response => {
      this.showMessage("Article removed");
      
    });
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
      newArticle.tags = newArticle.tags ? newArticle.tags.concat(event.currentTarget.value) : [event.currentTarget.value];
      this.props.changeArticle(newArticle);
    }
  }
  onSave(ev) {

    
  }

    
  render() {
    const tags = this.props.article && this.props.article.tags && this.props.article.tags.map((tag, i) =>
            <ul className="tags"><Tags key={i}  onRemoveClick={this.onRemoveTag}>{tag}</Tags></ul>
          );
    return (this.props.article.author ?
      <article>
        <div>
          Author
          <input type="text" disabled={!this.state.editMode} value={this.props.article.author} onChange={this.onChangeInput} ref="author"/>
        </div>
        <div>
          Title
          <input type="text" disabled={!this.state.editMode} value={this.props.article.title} onChange={this.onChangeInput}  ref="title" />
        </div>
        <div>
          Excerpt
          <textarea rows="6" cols="50"  disabled={!this.state.editMode} value={this.props.article.excerpt} onChange={this.onChangeInput}   ref="excerpt" />
        </div>
        <div>
          Content
          <textarea rows="6" cols="50" disabled={!this.state.editMode} value={this.props.article.content} onChange={this.onChangeInput}   ref="content" />
        </div>
         <div>
           Published
          <input type="checkbox" disabled={!this.state.editMode} className="checkbox" checked={this.props.article.published} onChange={this.onChangeInput}   ref="published" />
        </div>
        <div>
          {tags}  
          {this.state.editMode ? 
              this.state.isCreating ? 
                <input type="text"
                  onKeyPress={this.onKeyPress}
                />
              : <div onClick={this.onAddClick}>
                  +
                </div> 
              : <div></div>  
            }
        </div>
        {
          this.state.editMode ? 
          <div><span className="button update"  onClick={this.handleSubmit}>Update</span><span className="button update" onClick={this.onEdit}>Cancel</span></div> :
          <div><span className="button" onClick={this.onEdit}>Edit</span></div>
        }    
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
const mapDispatchToProps = dispatch => bindActionCreators({getArticle,updateArticle,saveArticle,changeArticle},dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);
