import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getProjectDetailsRequest,updateProjectsRequest,deleteProjectRequest} from '../../../actions'
import {Row,Col,ModalBody,ModalFooter,ModalHeader,Button,Input} from 'reactstrap';

class ShowProjectDetails extends Component{
  constructor(props){
    super(props);
    const value=this.props.data.project_data[this.props.index];
    console.log("project details constructor",this.props.data.project_details);
    this.state={present:false,
               update:false,
                project_name:value.project_name,
              project_details:this.props.data.project_details,
              project_info:value.project_info,
                sampleFile:''
                 }
  }
  componentDidMount(){
    console.log(this.props.data.auth_token,this.props.data.user_id,this.props.data.project_data[this.props.index].uuid);
    this.props.getProjectDetailsRequest(this.props.data.auth_token,
      this.props.data.user_id,
      this.props.data.project_data[this.props.index].uuid);
      console.log("project details componentDidMount",this.props.data.project_details);
      this.setState({project_details:this.props.data.project_details})
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data.project_details!==undefined){
      this.setState({present:true,
        project_name:nextProps.data.project_name,
      project_info:nextProps.data.project_info,
        sampleFile:'',
        project_details:nextProps.data.project_details
      })
    }
    if(nextProps.data.project_data!==this.props.data.project_data&&
      nextProps.data.project_data[this.props.index].status==this.props.data.project_data[this.props.index].status){
    console.log('nextProps',nextProps.data.project_data);
    this.update();
  }
  }
  toggle=()=>{
    this.props.toggle();
  }
  update=()=>{
      this.setState({update:!this.state.update})
  }
  delete=()=>{
    this.props.deleteProjectRequest(this.props.data.auth_token,
      this.props.data.user_id,this.props.data.project_data[this.props.index].uuid);
  }
  handleOnChange=(event)=>{
    console.log(this.state.project_name);
    this.setState({[event.target.name]:event.target.value});
    console.log(this.state.project_name);
  }
  handleOnChangefile=(event)=>{
    console.log('file : ',event.target.files);
    this.setState({sampleFile:event.target.files[0]})
  }
  save=()=>{
      var formData=new FormData();
      formData.append('project_name',this.state.project_name);
      formData.append('project_details',this.state.project_details);
      formData.append('project_info',this.state.project_info);
      //formData.append('course_uuid',this.props.data.course_data[this.props.index].uuid)
      formData.append('sampleFile',this.state.sampleFile);
      formData.append('uuid',this.props.data.project_data[this.props.index].uuid)

      for(var pair of formData.entries()) {
       console.log(pair[0]+ ', '+ pair[1]);
       }
       console.log('course uuid ::::::',formData.get("uuid"));
      this.props.updateProjectsRequest(this.props.data.auth_token,this.props.data.user_id,formData);

  }

  render(){
    console.log('render',this.props.data.project_details);
      const value=this.props.data;
      const valueData=this.props.data.project_data[this.props.index];
    if(this.state.present&&!(this.state.update)){
    return(
      <div>
      <ModalHeader className="colHead">Project Details</ModalHeader>
      <ModalBody>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Name</Col>
          <Col className="colBody" sm={{size:8}}>{valueData.course_name}</Col>
      </Row>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Project Name</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input name="project_name" value={this.state.project_name} onChange={this.handleOnChange} />
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Project Info</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input name="project_info" value={this.state.project_info} onChange={this.handleOnChange}  />
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Image Link</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input type="file" name="sampleFile" onChange={this.handleOnChangefile} />
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Project Details</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input name="project_details" value={this.state.project_details} onChange={this.handleOnChange}/>
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
      <ModalHeader className="colHead">Project Details</ModalHeader>
      <ModalBody>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Name</Col>
          <Col className="colBody" sm={{size:8}}>{valueData.course_name}</Col>
      </Row>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Project Name</Col>
          <Col className="colBody" sm={{size:8}}>{value.project_name}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Project Info</Col>
          <Col className="colBody" sm={{size:8}}>{value.project_info}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Image Link</Col>
          <Col className="colBody" sm={{size:8}}>{value.image_link}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Project Details</Col>
          <Col className="colBody" sm={{size:8}}>{value.project_details}</Col>
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
        <Button className="btn-modal" onClick={this.delete}>Inactivate Project</Button>
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

export default connect(mapStateToProps,{getProjectDetailsRequest,updateProjectsRequest,deleteProjectRequest})(ShowProjectDetails)
