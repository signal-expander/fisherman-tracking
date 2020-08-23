import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Route, Router, Switch } from 'react-router-dom';
import expander_routes from './routes/expander_routes';
import { history } from './utils';
import Tracker from './layouts/Tracker';

function App() {

  console.log("routes ->", expander_routes);

  return (
    <>
      <main>
        <div>
          <Router history={history}>
            <Switch>
              {
                expander_routes.map((link, key) =>
                  <Route
                    path={link.route}
                    exact
                    component={link.component}
                    key={key}
                  />
                )
              }
              <Route 
                path={`/`}
                exact
                component={Tracker}
              />
            </Switch>
          </Router>
        </div>
      </main>
    </>
  );
}

export default App;
