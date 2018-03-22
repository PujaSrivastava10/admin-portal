import React,{Component} from 'react';
import {Modal, ModalHeader, ModalBody,ModalFooter,Row,Col,Button,Input,
Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {connect} from 'react-redux';
import {addBlogRequest,getCoursesRequest} from '../../../actions';
import Blogs from './blogs';
import axios from 'axios';

class AddNewBlog extends Component {
  constructor(props) {
    super(props);
    this.state={blog_name:'',blog_info:'',
    blog_details:'',image_link:'',
    renderCourse:false,dropdownOpen:false,
    dropDownValue:'---select the course to add a blog----',
    key:0
    }
  }
  handleOnChange=(event)=>{
    this.setState({[event.target.name]:event.target.value})
  }
  handleOnChangefile=(event)=>{
    this.setState({image_link:event.target.files[0]});
     }


  handleOnSubmit=()=>{
    var formData = new FormData();
    formData.append('blog_name',this.state.blog_name);
    formData.append('blog_details',this.state.blog_details);
    formData.append('blog_info',this.state.blog_info);
    formData.append('course_uuid',this.props.data.course_data[this.state.key].uuid);
    formData.append('sampleFile', this.state.image_link);
    for(var pair of formData.entries()) {
     console.log(pair[0]+ ', '+ pair[1]);
     }
      this.props.addBlogRequest(this.props.data.auth_token,this.props.data.user_id,formData);
      //console.log(this.state.course_name.trim());
      if((this.state.blog_name.trim()!=='')&&
      (this.state.blog_info.trim()!=='')&&
      (this.state.blog_details.trim()!==''&&this.state.image_link!=='')){
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
  toggleDropdown=()=>{
    this.setState({dropdownOpen:!this.state.dropdownOpen})
  }

  render(){
    if(this.state.renderCourse){
      return(
      <Blogs />
    )
    }
    else{
      console.log('course_data',this.state.key);
      console.log('uuid',);
        console.log('state',this.state);
    return(
      <div>
      <ModalHeader className="colHead">Enter details to add a New Blog</ModalHeader>
      <ModalBody>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Course Name</Col>
          <Col className="colBody" sm={{size:8,offset:1}}>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} onChange={this.handleDropdownOnchange}>
          <DropdownToggle caret>
           {this.state.dropDownValue}
          </DropdownToggle>
         <DropdownMenu>
         {this.props.data.course_data.map((value,key)=>
           <DropdownItem key={key} onClick={(e)=>this.setState({
                     dropDownValue:e.currentTarget.textContent,
                      key:key})}>
           {value.course_name}</DropdownItem>
         )}
         </DropdownMenu>
      </Dropdown>
          </Col>
      </Row>
      <Row  className="rowBody">
          <Col className="colHead" sm={{size:3}}>Blog Name</Col>
          <Col className="colBody" sm={{size:8,offset:1}}>
          <Input name="blog_name" onChange={this.handleOnChange} required/>

          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Blog Info</Col>
          <Col className="colBody" sm={{size:8,offset:1}}>
          <Input name="blog_info" onChange={this.handleOnChange} required/>
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Blog Details</Col>
          <Col className="colBody" sm={{size:8,offset:1}}>
          <Input name="blog_details" onChange={this.handleOnChange} required/>
          </Col>
      </Row>
      <Row className="rowBody">
          <Col className="colHead" sm={{size:3}}>Image Link</Col>
          <Col className="colBody" sm={{size:8,offset:1}}>
          <Input type="file" name="image_link" onChange={this.handleOnChangefile} required/>
          </Col>
      </Row>
      </ModalBody>
      <ModalFooter>
      <Button className="btn-modal" onClick={this.handleOnSubmit}>Submit</Button>
      <Button className="btn-modal" onClick={this.toggleAdd}>Cancel</Button>
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

export default connect(mapStateToProps,{addBlogRequest})(AddNewBlog);
