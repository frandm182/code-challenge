import React from 'react';

const Article = ({ article }) =>
  <article>
    <h2>{article.title}</h2>
    <h1>{article.author}</h1>
    <p>{article.excerpt}</p>
    <a href="#" className="readmore">Read more</a>
  </article>;

export default Article;
