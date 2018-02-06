import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Row,Col,Card,Form,FormGroup,Input,Button,Label,Table,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import NavbarDashboard from './navbarDashboard'
import Sidebar from './sidebar.js'
import {Redirect} from 'react-router'
import {getBlogsRequest} from '../../actions'
class Blogs extends Component{
   constructor(props){
     super(props);
     this.state={data_present:false,modal: false,blogKey:''}
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
    <Card className="cardForDashboard">
      <Row className="rowHead">
      <Col xs={{size:1}} className="colHead">S.No.</Col>
      <Col xs={{size:3}} className="colHead">Course Name</Col>
      <Col xs={{size:2}} className="colHead">Blog Name</Col>
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
             <Col xs={{size:3}}  className="colBody">{value.course_name}</Col>
             <Col xs={{size:2}} className="colBody">{value.blog_name}</Col>
             <Col xs={{size:2}} className="colBody">{value.added_by}</Col>
             <Col xs={{size:2}} className="colBody">{value.updated_by}</Col>
             <Col xs={{size:2}} className="colBody">{value.status}</Col>
           </Row>
           <Modal className="showModal" isOpen={this.state.modal&&(this.state.blogKey===key)}>
           <ModalHeader className="colHead">{value.course_name}</ModalHeader>
           <ModalBody>
           <Row  className="rowBody">
               <Col className="colHead" sm={{size:3}}>Blog Name</Col>
               <Col className="colBody" sm={{size:8}}>{value.blog_name}</Col>
           </Row>
           <Row className="rowBody">
               <Col className="colHead" sm={{size:3}}>Blog Info</Col>
               <Col className="colBody" sm={{size:8}}>{value.blog_info}</Col>
           </Row>
           <Row className="rowBody">
               <Col className="colHead" sm={{size:3}}>Image Link</Col>
               <Col className="colBody" sm={{size:8}}>{value.image_link}</Col>
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
             <Button className="btn-modal" onClick={this.toggle}>Cancel</Button>
           </ModalFooter>
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
