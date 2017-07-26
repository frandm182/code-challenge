import React, { Component } from 'react';
import request from '../../request';
import { ARTICLES_QUERY } from '../../queries';
import Article from './Article';


const Articles = ({ articles }) =>
  <div className="App">
    <div className="secwrapper">
      <section>{articles.map(article => (<Article article={article} />))}</section>
    </div>
  </div>;
export default Articles;
