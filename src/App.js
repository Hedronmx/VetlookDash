import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './shards-dashboard/styles/shards-dashboards.1.1.0.min.css';
import { auth } from './firebase';
import LoginLayout from './layouts/LoginLayout';
import Loader from './components/Loader/Loader';

const App = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
    };
    const timer = setTimeout(() => {
      fetchUser();
      setLoading(!loading);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  } else if (user) {
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ''}>
        <>
          <Redirect from='/xlogin' to='/admin/home' />
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={(props) => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                }}
              />
            );
          })}
        </>
      </Router>
    );
  } else {
    return (
      <Router>
        <div>
          <Redirect to='/xlogin' />
          <Route path='/xlogin' exact={true} render={() => <LoginLayout />} />
        </div>
      </Router>
    );
  }
};
export default App;
