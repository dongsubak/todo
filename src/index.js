import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TodoModel from './TodoModel';
import registerServiceWorker from './registerServiceWorker';

let model = new TodoModel('react-todos');
ReactDOM.render(<App model={model}/>, document.getElementById('root'));
registerServiceWorker();
