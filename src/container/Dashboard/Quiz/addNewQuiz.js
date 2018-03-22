import React,{Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter,Row,Col,Button,Input} from 'reactstrap';
import {connect} from 'react-redux';
import {addCoursesRequest,getCoursesRequest} from '../../../actions';
import Quizes from './quizes';

class AddNewQuiz extends Component {
  constructor(props) {
    super(props);
    this.state={course_name:'',course_info:'',course_details:'',video_link:'',renderCourse:false}
  }
  // handleOnChange=(event)=>{
  //   this.setState({[event.target.name]:event.target.value})
  // }
  // handleOnSubmit=()=>{
  //   console.log(this.state);
  //     this.props.addCoursesRequest(this.props.data.auth_token,this.props.data.user_id,this.state);
  //     console.log(this.state.course_name.trim());
  //     console.log(this.state);
  //     if((this.state.course_name.trim()!=='')&&
  //     (this.state.course_info.trim()!=='')&&
  //     (this.state.course_details.trim()!=='')&&
  //     (this.state.video_link.trim()!=='')){
  //     this.setState({renderCourse:true})
  //      this.props.toggleSubmit();
  //   }
  // }
  toggleAdd=()=>{
    this.props.toggleSubmit();
  }
  render(){
    if(this.state.renderCourse){
      return(
      <Quizes />
    )
    }
    else{
    return(
      <form >
      <ModalHeader className="colHead">course_name</ModalHeader>
      <ModalBody>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Name</Col>
          <Col className="colBody" sm={{size:8,offset:1}}>
          <Input name="course_name" onChange={this.handleOnChange} required/>
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Info</Col>
          <Col className="colBody" sm={{size:8,offset:1}}>
          <Input name="course_info" onChange={this.handleOnChange} required/>
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Video Link</Col>
          <Col className="colBody" sm={{size:8,offset:1}}>
          <Input name="video_link" onChange={this.handleOnChange} required/>
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Details</Col>
          <Col className="colBody" sm={{size:8,offset:1}}>
          <Input name="course_details" onChange={this.handleOnChange} required/>
          </Col>
      </Row>
      </ModalBody>
      <ModalFooter>
      <Button className="btn-modal" type="submit">Submit</Button>
      <Button className="btn-modal" onClick={this.toggleAdd}>Cancel</Button>
       </ModalFooter>
     </form>
    )
  }
}
}

function mapStateToProps(state){
  return{
    data:state
  }
}

export default connect(mapStateToProps,{addCoursesRequest,getCoursesRequest})(AddNewQuiz);
