import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Row,Col,Card,Form,FormGroup,Input,Button,Label,Table,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import NavbarDashboard from '../navbarDashboard'
import Sidebar from '../sidebar.js'
import {Redirect} from 'react-router'
import {getBlogsRequest} from '../../../actions'
import AddNewBlog from './addNewBlog';
import ShowBlogDetails from './ShowBlogDetails'
class Blogs extends Component{
   constructor(props){
     super(props);
     this.state={data_present:false,modal: false,blogKey:'' , modalAdd:false, delBlogKey:''}
   }
  componentDidMount(){
      console.log('auth_token',this.props.data.auth_token);
      this.props.getBlogsRequest(this.props.data.auth_token,this.props.data.user_id)
  }
  componentWillReceiveProps(nextProps){
    console.log('nextProps',nextProps);
      if(nextProps.data.blog_data!==undefined){
        this.setState({data_present:true})
        console.log(nextProps.data.blog_data[0]);
      }
    }
toggle=()=>{
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleAdd=()=>{
    this.setState({
      modalAdd:!this.state.modalAdd
    });
  }

  render(){
    if(!(this.props.data.logStatus)){
      return(
      <Redirect to='/'/>)
    }else if((this.props.data.logStatus)&&(this.state.data_present)){
    return(
    <Row>
    <Col xl={{size:12}}>
    <NavbarDashboard />
    <Row>
    <Col sm={{size:2}}>
    <Sidebar />
    </Col>
    <Col sm={{size:8,offset:1}} className="canvasforDashboard">
    <Row>
    <Col xs={{size:3}} className="title">Blogs </Col>
    <Col xs={{size:2,offset:7}}>
    <Button className="btn-add" onClick={this.toggleAdd}>Add New Blog</Button>
    <Modal className="showModal" isOpen={this.state.modalAdd}>
    <AddNewBlog toggleSubmit={this.toggleAdd}/>
    </Modal>
    </Col>
    </Row>
    <Card className="cardForDashboard">
      <Row className="rowHead">
      <Col xs={{size:1}} className="colHead">S.No.</Col>
      <Col xs={{size:2}} className="colHead">Course Name</Col>
      <Col xs={{size:3}} className="colHead">Blog Name</Col>
      <Col xs={{size:2}} className="colHead">Added by</Col>
      <Col xs={{size:2}} className="colHead">Updated by</Col>
      <Col xs={{size:2}} className="colHead">Status</Col>
      </Row>
       {this.props.data.blog_data.map((value,key)=>
         <div key={key}>
         <Row className="rowBody" onClick={()=>{
                                  this.setState({
                                    modal:!(this.state.modal),
                                   blogKey:key})}}>
             <Col xs={{size:1}}  className="colBody">{key+1}.</Col>
             <Col xs={{size:2}}  className="colBody">{value.course_name}</Col>
             <Col xs={{size:3}} className="colBody">{value.blog_name}</Col>
             <Col xs={{size:2}} className="colBody">{value.added_by}</Col>
             <Col xs={{size:2}} className="colBody">{value.updated_by}</Col>
             <Col xs={{size:2}} className="colBody">{value.status}</Col>
           </Row>
           <Modal className="showModal" isOpen={this.state.modal&&(this.state.blogKey===key)}>
          <ShowBlogDetails index={key} value={value} toggle={this.toggle}/ >
         </Modal>
         </div>
        )}
    </Card>
    </Col>
    </Row>
    </Col>
    </Row>
  )}
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
export default connect(mapStateToProps,{getBlogsRequest})(Blogs)
