import React from 'react';
import { Typography } from '@material-ui/core';
import { notNil, notEmpty } from '../../utils';

interface ErrorMessageProps {
  errorMessage?: string;
}

const Message = ({ message }: { message: string }) => (
  <Typography
    align="center"
    variant="overline"
    display="block"
    color="error"
    gutterBottom>
    {message}
  </Typography>
);

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => (
  <>
    {notNil(errorMessage) && notEmpty(errorMessage) ? (
      <Message message={errorMessage} />
    ) : (
      <></>
    )}
  </>
);

export default ErrorMessage;
