import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import Firebase, {FirebaseContext} from './components/Firebase';
import {Provider} from 'react-redux';
import store from './redux/store';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
     <Provider store={store}>

        <App/>
      </Provider>
    </FirebaseContext.Provider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
