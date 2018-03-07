import React, { Component } from 'react';
import Login from './components/fLogin';
import Home from './components/fHome';
import Register from './components/fRegister';
import UserGroup from './components/UserGroup';
import Menu from './components/Menu'
import User from './components/user'
import {
  Switch,
  Route,
} from 'react-router-dom'
//import UserGroup from './components/UserGroup';

class RouterPage extends Component {
  previousLocation = this.props.location
  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }
  
  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    )
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/userGroup" component={UserGroup} />
          <Route path="/menu" component={Menu} />
          <Route path="/user" component={User} />
        </Switch>
      </div>
    );
  }
}
export default RouterPage