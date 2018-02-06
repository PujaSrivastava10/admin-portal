import React,{Component} from 'react';
import {Card,Form,FormGroup,Input,Label,Button} from 'reactstrap';
import NavbarLoginSignUp from './navbarLoginSignup';
import axios from 'axios'
import {host} from '../config/index.js'
import {Redirect,Route} from 'react-router'
import Dashboard from './Dashboard/dashboard';
import {adminLoginRequest} from '../actions';
import {connect} from 'react-redux'

 class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state={email_id:'',password:'',loggedIn:''}
  }

  handleOnChange=(e)=>{
       this.setState({[e.target.name]:e.target.value})
  }


  handleOnSubmit=(e)=>{
    e.preventDefault();
    this.props.adminLoginRequest(this.state.email_id,this.state.password);
    console.log(this.props,'this.props');
}
componentWillReceiveProps(nextProps){
  console.log(nextProps);
  if(nextProps.data.logStatus){
    this.setState({loggedIn:true});

  }
}
  render(){
    if(this.state.loggedIn){
      return(
      <Redirect to='/dashboard'/>)
    }else{
      return(
      <div>
      <NavbarLoginSignUp />
      <Card className="cardForSign">
      <h1 className="label">Login </h1><hr className="line"></hr>
      <Label className="label" >Have an account? Sign In.</Label>
      <Form className="form" onSubmit={this.handleOnSubmit}>
          <FormGroup>
          <Input type="email" name="email_id" placeholder="Username" onChange={this.handleOnChange} required/>
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" placeholder="Password" onChange={this.handleOnChange} required/>
        </FormGroup>
        <Button type="submit" className="btn-sign"><h6>Login</h6></Button>
      </Form>
      </Card>
      </div>
    )
  }
}
}

function mapStateToProps(state){
  return {data:state}
}

export default connect(mapStateToProps,{adminLoginRequest})(LoginForm);
