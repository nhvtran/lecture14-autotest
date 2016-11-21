/*eslint no-unused-vars: "off"*/ //don't show warnings for unused
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App, {DogList} from './PetApp';
import {AboutPage, ResourcesPage} from './About';
import AdoptPage from './AdoptDog';

//css files
import './pet-app.css'; //load CSS for app
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={DogList} />
      <Route path="list" component={DogList}>
        <Route path=":breed" />
      </Route>
      <Route path="about" component={AboutPage} />
      <Route path="resources" component={ResourcesPage} />
      <Route path="adopt/:dogName" component={AdoptPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);
