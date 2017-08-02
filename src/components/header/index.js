import React from 'react';
import {
  Link,
} from 'react-router-dom'
;

const Header = () =>
  <header>
    <h1><a href="/" >Billin Code</a></h1>
    <nav>
      <ul><li><Link to={{ pathname: '/new' }}>New Article</Link></li></ul>
    </nav>
  </header>;

export default Header;
