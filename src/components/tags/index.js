import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ children, disable, onRemoveClick, clave }) =>
  <li className="tag" key={clave}>
    {children}
    {!disable &&
      <div className="delete" onClick={() => onRemoveClick(children)}>X</div>}
  </li>;

Tags.propTypes = {
  children: PropTypes.node,
  disable: PropTypes.bool,
  onRemoveClick: PropTypes.func,
};

export default Tags;
