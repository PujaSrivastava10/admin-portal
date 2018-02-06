import React,{Component} from 'react';
import {Card,Form,FormGroup,Input,Label,Button} from 'reactstrap';
import NavbarLoginSignUp from './navbarLoginSignup'

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  handleOnChange=(e)=>{
       this.setState({[e.target.name]:e.target.value})
  }

  handleOnSubmit=(e)=>{
    e.preventDefault();
    console.log(this.state);
  }

  render(){
    return(
      <div>
      <NavbarLoginSignUp />
      <Card className="cardForSign">
      <h1 className="label">Sign Up </h1><hr className="line"></hr>
      <Label className="label" >Need account? Fill in these details.</Label>
      <Form className="form">
          <FormGroup>
          <Input type="email" name="email" placeholder="Enter email" required/>
        </FormGroup>
        <FormGroup>
        <Input type="text" name="Username" placeholder="Username" required/>
      </FormGroup>
        <FormGroup>
          <Input type="password" name="password" placeholder="Password" required/>
        </FormGroup>
        <Button className="btn-sign"><h6>Sign Up</h6></Button>
      </Form>
      </Card>
      </div>
    )
  }
}
