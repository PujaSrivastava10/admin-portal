import React,{Component} from 'react';
import {connect} from 'react-redux';
import {ModalHeader, ModalBody, ModalFooter,Row,Col,Button,Input} from 'reactstrap';
import {updateCourseRequest,getCoursesRequest} from '../../../actions'

class ShowModal extends Component{
  constructor(props){
    super(props);
    const value=this.props.data.course_data[this.props.index]
    this.state={update:false,
               course_name:value.course_name,
               course_info:value.course_info,
                video_link:value.video_link,save:false}
  }
  update=()=>{
    console.log('this.props',this.props.data.course_data[this.props.index].uuid);
    this.setState({update:!this.state.update})
  }
  save=()=>{
      this.props.updateCourseRequest(this.props.data.auth_token,this.props.data.user_id,this.state,
      this.props.data.course_data[this.props.index].uuid);
  }
  componentWillReceiveProps(nextProps){
      console.log(nextProps.data.course_data);
    if(nextProps.data.course_data!=this.props.data.course_data){

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
  render(){
    const value=this.props.data.course_data[this.props.index];
    if(this.state.update){
      return(
        <div>
        <ModalHeader className="colHead">{value.course_name}</ModalHeader>
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
        <Row className="rowBody">
            <Col className="colHead" sm={{size:3}}>Video Link</Col>
            <Col className="colBody" sm={{size:8}}>
            <Input name="video_link" value={this.state.video_link} onChange={this.handleOnChange}/>
            </Col>
        </Row>
        <Row className="rowBody">
            <Col className="colHead" sm={{size:3}}>Added By</Col>
            <Col className="colBody" sm={{size:8}}>{value.added_by}</Col>
        </Row>
        <Row className="rowBody">
            <Col className="colHead" sm={{size:3}}>Upated By</Col>
            <Col className="colBody" sm={{size:8}}>{value.updated_by}</Col>
        </Row>
        <Row className="rowBody">
            <Col className="colHead" sm={{size:3}}>Status</Col>
            <Col className="colBody" sm={{size:8}}>{value.status}</Col>
        </Row>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-modal" onClick={this.save}>Save</Button>
          <Button className="btn-modal" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
        </div>
      )
    }
    else{
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
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Video Link</Col>
          <Col className="colBody" sm={{size:8}}>{value.video_link}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Added By</Col>
          <Col className="colBody" sm={{size:8}}>{value.added_by}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Upated By</Col>
          <Col className="colBody" sm={{size:8}}>{value.updated_by}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Status</Col>
          <Col className="colBody" sm={{size:8}}>{value.status}</Col>
      </Row>
      </ModalBody>
      <ModalFooter>
        <Button className="btn-modal" onClick={this.update}>Update</Button>
        <Button className="btn-modal" onClick={this.toggle}>Cancel</Button>
      </ModalFooter>
      </div>
    )
  }
}
}

function mapStateToProps(state){
  return{
    data:state
  }
}

export default connect(mapStateToProps,{updateCourseRequest,getCoursesRequest})(ShowModal)
