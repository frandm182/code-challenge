import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ children, disable, onRemoveClick }) =>
  <li className="tag">
    {children}
    {!disable &&
      <span onClick={() => onRemoveClick(children)}>X</span>}
  </li>;

Tags.propTypes = {
  children: PropTypes.node,
  disable: PropTypes.bool,
  onRemoveClick: PropTypes.func,
};

export default Tags;
