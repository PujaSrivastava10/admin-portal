import React,{Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter,Row,Col,Button,Input} from 'reactstrap';
import {connect} from 'react-redux';
import {addCoursesRequest,getCoursesRequest} from '../../../actions';
import Courses from './courses'

class AddNewCourse extends Component {
  constructor(props) {
    super(props);
    this.state={course_name:'',course_info:'',course_details:'',sampleFile:'',video_link:'',renderCourse:false}
  }
  handleOnChange=(event)=>{
    this.setState({[event.target.name]:event.target.value})
  }
  handleOnChangefile=(event)=>{
    console.log('file : ',event.target.files);
    this.setState({sampleFile:event.target.files[0]})
  }
  handleOnSubmit=()=>{
    var formData=new FormData();
    formData.append('course_name',this.state.course_name);
    formData.append('course_details',this.state.course_details);
    formData.append('course_info',this.state.course_info);
    formData.append('video_link',this.state.video_link);
    formData.append('sampleFile',this.state.sampleFile);

    for(var pair of formData.entries()) {
     console.log(pair[0]+ ', '+ pair[1]);
     }
     console.log('course uuid ::::::',formData.get("uuid"));
       this.props.addCoursesRequest(this.props.data.auth_token,this.props.data.user_id,formData);
      if((this.state.course_name.trim()!=='')&&
      (this.state.course_info.trim()!=='')&&
      (this.state.course_details.trim()!=='')&&
      (this.state.video_link.trim()!==''&&this.state.sampleFile!=='')){
      this.setState({renderCourse:true})
       this.props.toggleSubmit();
    }
      else {
        alert('fill in all the details to submit')
      }

  }
  toggleAdd=()=>{
    this.props.toggleSubmit();
  }
  render(){
    if(this.state.renderCourse){
      return(
      <Courses />
    )
    }
    else{
    return(
      <form>
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
          <Col className="colHead" sm={{size:3}}>Course Logo</Col>
          <Col className="colBody" sm={{size:8,offset:1}}>
          <Input type="file" name="sampleFile" onChange={this.handleOnChangefile} />
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
      <Button className="btn-modal" onClick={this.handleOnSubmit}>Submit</Button>
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

export default connect(mapStateToProps,{addCoursesRequest,getCoursesRequest})(AddNewCourse);
