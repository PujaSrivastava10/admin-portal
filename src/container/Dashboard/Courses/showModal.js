import React,{Component} from 'react';
import {connect} from 'react-redux';
import {ModalHeader, ModalBody, ModalFooter,Row,Col,Button,Input} from 'reactstrap';
import {updateCourseRequest,getCoursesRequest,getCoursesDetailsRequest,deleteCourseRequest} from '../../../actions'

class ShowModal extends Component{
  constructor(props){
    super(props);
    const valueData=this.props.data.story_data[this.props.index];
    const value=this.props.data;
    this.state={update:false,present:false,
               course_name:value.course_name,
               course_info:value.course_info,
                video_link:value.video_link,
                sampleFile:'',
                course_details:this.props.data.course_details,
                save:false}
  }

  componentDidMount(){
    console.log(this.props.data.auth_token,this.props.data.user_id,this.props.data.course_data[this.props.index].uuid);
    this.props.getCoursesDetailsRequest(this.props.data.auth_token,
      this.props.data.user_id,
      this.props.data.course_data[this.props.index].uuid)
  }

  update=()=>{
    console.log('this.props',this.props.data.course_data[this.props.index].uuid);
    this.setState({update:!this.state.update})
  }
  delete=()=>{
    this.props.deleteCourseRequest(this.props.data.auth_token,
      this.props.data.user_id,
      this.props.data.course_data[this.props.index].uuid);
  }
  save=()=>{
    var formData=new FormData();
    console.log('state : ',this.state);
    formData.append('course_name',this.state.course_name);
    formData.append('video_link',this.state.video_link);
    formData.append('course_details',this.state.course_details);
    formData.append('course_info',this.state.course_info);
    formData.append('uuid',this.props.data.course_data[this.props.index].uuid);
    formData.append('sampleFile',this.state.course_logo);

    for(var pair of formData.entries()) {
     console.log(pair[0]+ ', '+ pair[1]);
     }

      this.props.updateCourseRequest(this.props.data.auth_token,this.props.data.user_id,formData);
  }
  componentWillReceiveProps(nextProps){
    console.log('COURSE DETAILS : ',nextProps.data.course_details);
    if(nextProps.data.course_details!==undefined){
      this.setState({present:true,
        course_name:nextProps.data.course_name,
        course_info:nextProps.data.course_info,
        sampleFile:'',
        video_link:nextProps.data.video_link,
        course_details:nextProps.data.course_details
      })
    }
    console.log('this.props status',this.props.data.course_data[this.props.index].status);
      console.log('nextProps status',nextProps.data.course_data[this.props.index].status);
    if(nextProps.data.course_data!=this.props.data.course_data&&
    nextProps.data.course_data[this.props.index].status==this.props.data.course_data[this.props.index].status){
      console.log('nextProps',nextProps.data.course_data);
      this.update();
    }

  }
  toggle=()=>{
    this.props.toggle();
  }
  handleOnChange=(event)=>{
    this.setState({[event.target.name]:event.target.value});
    console.log(this.state);
  }
  handleOnChangefile=(event)=>{
    console.log('file : ',event.target.files);
    this.setState({course_logo:event.target.files[0]})
  }
  render(){
    const value=this.props.data;
    const valueData=this.props.data.course_data[this.props.index];
    if(this.state.present&&!(this.state.update)){
      return(
        <div>
        <ModalHeader className="colHead">Courses Details</ModalHeader>
        <ModalBody>
        <Row  className="rowBody">
            <Col className="colHead" sm={{size:3}}>Course Name</Col>
            <Col className="colBody" sm={{size:8}}>
            <Input name="course_name" value={this.state.course_name} onChange={this.handleOnChange}/>
            </Col>
        </Row>
        <Row  className="rowBody">
            <Col className="colHead" sm={{size:3}}>Course Info</Col>
            <Col className="colBody" sm={{size:8}}>
            <Input name="course_info" value={this.state.course_info} onChange={this.handleOnChange}/>
            </Col>
        </Row>
        <Row  className="rowBody">
            <Col className="colHead" sm={{size:3}}>Course Details</Col>
            <Col className="colBody" sm={{size:8}}>
            <Input name="course_details" value={this.state.course_details} onChange={this.handleOnChange}/>
            </Col>
        </Row>
        <Row className="rowBody">
            <Col className="colHead" sm={{size:3}}>Video Link</Col>
            <Col className="colBody" sm={{size:8}}>
            <Input name="video_link" value={this.state.video_link} onChange={this.handleOnChange}/>
            </Col>
        </Row>
        <Row className="rowBody">
            <Col className="colHead" sm={{size:3}}>Course logo</Col>
            <Col className="colBody" sm={{size:8}}>
            <Input name="sampleFile" type="file" onChange={this.handleOnChangefile}/>
            </Col>
        </Row>
        <Row className="rowBody">
            <Col className="colHead" sm={{size:3}}>Added By</Col>
            <Col className="colBody" sm={{size:8}}>{valueData.added_by}</Col>
        </Row>
        <Row className="rowBody">
            <Col className="colHead" sm={{size:3}}>Upated By</Col>
            <Col className="colBody" sm={{size:8}}>{value.updated_by}</Col>
        </Row>
        <Row className="rowBody">
            <Col className="colHead" sm={{size:3}}>Status</Col>
            <Col className="colBody" sm={{size:8}}>{valueData.status}</Col>
        </Row>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-modal" onClick={this.save}>Save</Button>
          <Button className="btn-modal" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
        </div>
      )
    }
    else if(this.state.present&&this.state.update){
    return(
      <div>
      <ModalHeader className="colHead">{this.props.data.course_data[this.props.index].course_name}</ModalHeader>
      <ModalBody>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Name</Col>
          <Col className="colBody" sm={{size:8}}>{value.course_name}</Col>
      </Row>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Info</Col>
          <Col className="colBody" sm={{size:8}}>{value.course_info}</Col>
      </Row>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Details</Col>
          <Col className="colBody" sm={{size:8}}>{value.course_details}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Video Link</Col>
          <Col className="colBody" sm={{size:8}}>{value.video_link}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course logo</Col>
          <Col className="colBody" sm={{size:8}}>{value.course_logo}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Added By</Col>
          <Col className="colBody" sm={{size:8}}>{valueData.added_by}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Upated By</Col>
          <Col className="colBody" sm={{size:8}}>{value.updated_by}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Status</Col>
          <Col className="colBody" sm={{size:8}}>{valueData.status}</Col>
      </Row>
      </ModalBody>
      <ModalFooter>
        <Button className="btn-modal" onClick={this.update}>Update</Button>
          <Button className="btn-modal" onClick={this.delete}>Inactive Blog</Button>
        <Button className="btn-modal" onClick={this.toggle}>Cancel</Button>
      </ModalFooter>
      </div>
    )
  }
  else{
    return(
      <div></div>
    )
  }

}
}

function mapStateToProps(state){
  return{
    data:state
  }
}

export default connect(mapStateToProps,{updateCourseRequest,getCoursesRequest,getCoursesDetailsRequest,deleteCourseRequest})(ShowModal)
