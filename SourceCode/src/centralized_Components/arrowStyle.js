import React, { useState, useEffect } from 'react';

import {  makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  noArrows: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
      '&::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
  },
}));

export default useStyles;