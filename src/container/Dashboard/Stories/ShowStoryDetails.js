import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getStoriesDetailsRequest,updateStoriesRequest,deleteStoryRequest} from '../../../actions'
import {Row,Col,ModalBody,ModalFooter,ModalHeader,Button,Input} from 'reactstrap';

class ShowStoryDetails extends Component{
  constructor(props){
    super(props);
    const valueData=this.props.data.story_data[this.props.index];
    const value=this.props.data;
    this.state={present:false,
               update:false,
                story_name:value.story_name,
                story_details:value.story_details,
                story_info:value.story_info,
                sampleFile:'',
                thumbFile:''
                 }
  }
  componentDidMount(){
    console.log(this.props.data.auth_token,this.props.data.user_id,this.props.data.story_data[this.props.index].uuid);
    this.props.getStoriesDetailsRequest(this.props.data.auth_token,
      this.props.data.user_id,
      this.props.data.story_data[this.props.index].uuid)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data.story_details!==undefined){
      this.setState({present:true,
        story_name:nextProps.data.story_name,
        story_info:nextProps.data.story_info,
        sampleFile:'',
        thumbFile:'',
        story_details:nextProps.data.story_details
      })
    }
    if(nextProps.data.story_data!==this.props.data.story_data&&
    nextProps.data.story_data[this.props.index].status==this.props.data.story_data[this.props.index].status){
    console.log('nextProps',nextProps.data.story_data);
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
    this.props.deleteStoryRequest(this.props.data.auth_token,
      this.props.data.user_id,
      this.props.data.story_data[this.props.index].uuid);
  }
  handleOnChange=(event)=>{
    console.log(this.state.story_name);
    this.setState({[event.target.name]:event.target.value});
    console.log(this.state.story_name);
  }
  handleOnChangefile=(event)=>{
    console.log('file : ',event.target.files);
    this.setState({sampleFile:event.target.files[0],thumbFile:event.target.files[0]})
  }
  save=()=>{
      var formData=new FormData();
      formData.append('story_name',this.state.story_name);
      formData.append('story_details',this.state.story_details);
      formData.append('story_info',this.state.story_info);
      formData.append('sampleFile',this.state.sampleFile);
      formData.append('uuid',this.props.data.story_data[this.props.index].uuid);
      formData.append('thumbFile',this.state.thumbFile);


      for(var pair of formData.entries()) {
       console.log(pair[0]+ ', '+ pair[1]);
       }
      this.props.updateStoriesRequest(this.props.data.auth_token,this.props.data.user_id,formData);
  }

  render(){
    console.log('render',this.props.data.story_details);
      const valueData=this.props.data.story_data[this.props.index];
      const value=this.props.data;
    if(this.state.present&&!(this.state.update)){
    return(
      <div>
      <ModalHeader className="colHead">Story Details</ModalHeader>
      <ModalBody>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Name</Col>
          <Col className="colBody" sm={{size:8}}>{valueData.course_name}</Col>
      </Row>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Story Name</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input name="story_name" value={this.state.story_name} onChange={this.handleOnChange} />
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Story Info</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input name="story_info" value={this.state.story_info} onChange={this.handleOnChange}  />
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Image Link</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input type="file" name="sampleFile" onChange={this.handleOnChangefile} />
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Thumbnail Image Link</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input type="file" name="thumbFile" onChange={this.handleOnChangefile} />
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Story Details</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input name="story_details" value={this.state.story_details} onChange={this.handleOnChange}/>
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
  else if(this.state.present){
    return(
      <div>
      <ModalHeader className="colHead">Story Details</ModalHeader>
      <ModalBody>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Name</Col>
          <Col className="colBody" sm={{size:8}}>{valueData.course_name}</Col>
      </Row>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Story Name</Col>
          <Col className="colBody" sm={{size:8}}>{value.story_name}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Story Info</Col>
          <Col className="colBody" sm={{size:8}}>{value.story_info}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Thumbnail Image Link</Col>
          <Col className="colBody" sm={{size:8}}>{value.thumbnail_image_link}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Image Link</Col>
          <Col className="colBody" sm={{size:8}}>{value.image_link}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Story Details</Col>
          <Col className="colBody" sm={{size:8}}>{value.story_details}</Col>
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
        <Button className="btn-modal" onClick={this.delete}>Inactivate Story</Button>
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

export default connect(mapStateToProps,{getStoriesDetailsRequest,updateStoriesRequest,deleteStoryRequest})(ShowStoryDetails)
