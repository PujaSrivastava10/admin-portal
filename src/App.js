import React, { Component } from 'react';
import LoginForm from './container/loginForm'
import SignUpForm from './container/signUpForm'
import Dashboard from './container/Dashboard/dashboard';
import Courses from './container/Dashboard/Courses/courses';
import Stories from './container/Dashboard/Stories/stories'
import Blogs from './container/Dashboard/blogs'
import Projects from './container/Dashboard/projects'
import Quizes from './container/Dashboard/Quiz/quizes.js'
import Users from './container/Dashboard/Users/users.js'
import Admins from './container/Dashboard/Admin/admin.js'
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
       <div>
          <Route exact path="/Signup" component={SignUpForm}/>
          <Route  exact path="/" component={LoginForm}/>
          <Route  exact path="/dashboard" component={Dashboard}/>
          <Route exact path='/dashboard/Courses' component={Courses}/>
          <Route exact path='/dashboard/Stories' component={Stories}/>
          <Route exact path='/dashboard/Blogs' component={Blogs}/>
          <Route exact path='/dashboard/Projects' component={Projects}/>
          <Route exact path='/dashboard/Quizes' component={Quizes}/>
          <Route exact path='/dashboard/Users' component={Users}/>
          <Route exact path='/dashboard/Admins' component={Admins}/>
       </div>
     </Router>
    );
  }
}

export default App;
