import React from 'react';
import logo from './bodyparts-ebaylogo.png';
import './App.css';
import AuthComponent from './components/AuthComponent';
import Profile from './components/Profile';
import {Switch, NavLink, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser} from './ducks/reducer';
import axios from 'axios';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <header>

          <div className='logo-nav'>
            <div className='logo-box'>
              <img src={logo} alt='body parts ebay' />
            </div>
            <div className='nav-box'>
              <NavLink activeClassName='active' exact to='/' >Home</NavLink>
              <NavLink activeClassName='active' to='/store' >Store</NavLink>
              <NavLink activeClassName='active' to='/profile' >Profile</NavLink>
              {this.props.user && <button onClick={() => {
                axios.delete('/auth/logout').then(() => {
                  this.props.setUser(null);
                })
              }} >Logout</button>
              }
            </div>
          </div>

        </header>
        <Switch>
          <Route exact path='/' component={AuthComponent} />
          <Route path='/store' render={() => {
            return <div>Store</div>
          }} />
          <Route path='/profile' component={Profile} />
          <Route path='*' render={() => {
            return <div>Get that spoopy butt out of here!</div>
          }} />
        </Switch>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState){
  return reduxState
};
const mapDispatchToProps = {
  setUser
}
const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps);

export default invokedConnect(withRouter(App));
