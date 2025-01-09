import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Welcome from './components/login/Welcome';
import App from './App';
import Setup from './components/login/Setup';
import Signup from './components/login/Signup';
import Signin from './components/login/Signin';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import Login from './components/login/Login';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<App />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);