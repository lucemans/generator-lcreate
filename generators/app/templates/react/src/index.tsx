import * as React from 'react';
import { render } from 'react-dom';
import { Logger } from '@lucemans/logger';
import App from './App';
import chalk from 'chalk';

// Gather the root element
const root = document.getElementById('root');

// Initialize our logger
export const logger = new Logger(chalk.hex('51ccff')('REACT'));

// Render our App
render(<App></App>, root);