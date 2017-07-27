import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../home';
import ArticleForm from '../articles/ArticleForm';

const Main = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/article/:id" component={ArticleForm} />
    </Switch>
  </div>
);

export default Main
;
