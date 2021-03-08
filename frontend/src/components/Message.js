import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, msj, children }) => {
  return <Alert variant={variant}>{msj}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
