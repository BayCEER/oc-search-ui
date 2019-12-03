import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<App indexHost="localhost:5541" indexCollection="owncloud" />, document.getElementById('root'));

