import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getBlogDetailsRequest,updateBlogRequest,deleteBlogRequest} from '../../../actions'
import {Row,Col,ModalBody,ModalFooter,ModalHeader,Button,Input} from 'reactstrap';

class ShowBlogDetails extends Component{
  constructor(props){
    super(props);
    const value=this.props.data.blog_data[this.props.index];
    this.state={present:false,
               update:false,
                blog_name:value.blog_name,
              blog_details:this.props.data.blog_details,
              blog_info:value.blog_info,
                sampleFile:''
                 }
  }
  componentDidMount(){
    console.log(this.props.data.auth_token,this.props.data.user_id,this.props.data.blog_data[this.props.index].uuid);
    this.props.getBlogDetailsRequest(this.props.data.auth_token,
      this.props.data.user_id,
      this.props.data.blog_data[this.props.index].uuid)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data.blog_details!==undefined){
      this.setState({present:true,
        blog_name:nextProps.data.blog_name,
    blog_info:nextProps.data.blog_info,
        sampleFile:'',
      blog_details:nextProps.data.blog_details})
    }
    if(nextProps.data.blog_data!==this.props.data.blog_data&&
    nextProps.data.blog_data[this.props.index].status==this.props.data.blog_data[this.props.index].status){
    console.log('nextProps',nextProps.data.blog_data);
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
    this.props.deleteBlogRequest(this.props.data.auth_token,
      this.props.data.user_id,
      this.props.data.blog_data[this.props.index].uuid);
  }
  handleOnChange=(event)=>{
    console.log(this.state.blog_name);
    this.setState({[event.target.name]:event.target.value});
    console.log(this.state.blog_name);
  }
  handleOnChangefile=(event)=>{
    console.log('file : ',event.target.files);
    this.setState({sampleFile:event.target.files[0]})
  }
  save=()=>{
      var formData=new FormData();
      formData.append('blog_name',this.state.blog_name);
      formData.append('blog_details',this.state.blog_details);
      formData.append('blog_info',this.state.blog_info);
      //formData.append('course_uuid',this.props.data.course_data[this.props.index].uuid)
      formData.append('sampleFile',this.state.sampleFile);
      formData.append('uuid',this.props.data.blog_data[this.props.index].uuid)

      for(var pair of formData.entries()) {
       console.log(pair[0]+ ', '+ pair[1]);
       }
      this.props.updateBlogRequest(this.props.data.auth_token,this.props.data.user_id,formData);
  }

  render(){
    console.log('render',this.props.data.blog_details);
      const valueData=this.props.data.blog_data[this.props.index];
      const value=this.props.data;
    if(this.state.present&&!(this.state.update)){
    return(
      <div>
      <ModalHeader className="colHead">Blog Details</ModalHeader>
      <ModalBody>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Name</Col>
          <Col className="colBody" sm={{size:8}}>{valueData.course_name}</Col>
      </Row>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>blog Name</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input name="blog_name" value={this.state.blog_name} onChange={this.handleOnChange} />
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>blog Info</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input name="blog_info" value={this.state.blog_info} onChange={this.handleOnChange}  />
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Image Link</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input type="file" name="sampleFile" onChange={this.handleOnChangefile} />
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>blog Details</Col>
          <Col className="colBody" sm={{size:8}}>
          <Input name="blog_details" value={this.state.blog_details} onChange={this.handleOnChange}/>
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
      <ModalHeader className="colHead">Story Details</ModalHeader>
      <ModalBody>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Name</Col>
          <Col className="colBody" sm={{size:8}}>{valueData.course_name}</Col>
      </Row>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>blog Name</Col>
          <Col className="colBody" sm={{size:8}}>{value.blog_name}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>blog Info</Col>
          <Col className="colBody" sm={{size:8}}>{value.blog_info}</Col>
      </Row>

      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Image Link</Col>
          <Col className="colBody" sm={{size:8}}>{value.image_link}</Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>blog Details</Col>
          <Col className="colBody" sm={{size:8}}>{value.blog_details}</Col>
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

export default connect(mapStateToProps,{getBlogDetailsRequest,updateBlogRequest,deleteBlogRequest})(ShowBlogDetails)
