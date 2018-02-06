import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Row,Col,Card,Form,FormGroup,Input,Button,Label,Table,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import NavbarDashboard from '../navbarDashboard'
import Sidebar from '../sidebar.js'
import {Redirect} from 'react-router'
import {getStoriesRequest} from '../../../actions'
import AddNewStory from './addNewStory'
class Stories extends Component{
   constructor(props){
     super(props);
     this.state={data_present:false,modal: false,storyKey:'',modalAdd:false}
   }
  componentDidMount(){
    console.log('auth_token stories',this.props.data.auth_token);
      this.props.getStoriesRequest(this.props.data.auth_token,this.props.data.user_id)
  }
  componentWillReceiveProps(nextProps){
    console.log('nextProps',nextProps);
      if(nextProps.data.story_data!==undefined){
        this.setState({data_present:true})
        console.log(nextProps.data.story_data[0]);
      }

}
toggleAdd=()=>{
  this.setState({modalAdd:!this.state.modalAdd})
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
    <Row>
    <Col xs={{size:3}} className="title">Stories </Col>
    <Col xs={{size:2,offset:7}}>
    <Button className="btn-add" onClick={this.toggleAdd}>Add New Story</Button>
    <Modal className="showModal" isOpen={this.state.modalAdd}>
    <AddNewStory toggleSubmit={this.toggleAdd}/>
    </Modal>
    </Col>
    </Row>
    <Card className="cardForDashboard">
      <Row className="rowHead">
      <Col xs={{size:1}} className="colHead">S.No.</Col >
      <Col xs={{size:3}} className="colHead">Course Name</Col >
      <Col xs={{size:2}} className="colHead">Story Name</Col >
      <Col xs={{size:2}} className="colHead">Added by</Col >
      <Col xs={{size:2}} className="colHead">Updated by</Col >
      <Col xs={{size:2}} className="colHead">Status</Col >
      </Row>


       {this.props.data.story_data.map((value,key)=>
         <div key={key}>
         <Row className="rowBody" key={key} onClick={()=>{
                                  this.setState({
                                    modal:!(this.state.modal),
                                   storyKey:key})}}>
             <Col xs={{size:1}} className="colBody">{key+1}.</Col>
             <Col xs={{size:3}} className="colBody">{value.course_name}</Col>
             <Col xs={{size:2}} className="colBody">{value.story_name}</Col>
             <Col xs={{size:2}} className="colBody">{value.added_by}</Col>
              <Col xs={{size:2}} className="colBody">{value.updated_by}</Col>
             <Col xs={{size:2}} className="colBody">{value.status}</Col>
           </Row>
           <Modal className="showModal" isOpen={this.state.modal&&(this.state.storyKey===key)}>
           <ModalHeader className="colHead">{value.course_name}</ModalHeader>
           <ModalBody>
           <Row  className="rowBody">
               <Col className="colHead" sm={{size:3}}>Story Name</Col>
               <Col className="colBody" sm={{size:8}}>{value.story_name}</Col>
           </Row>
           <Row className="rowBody">
               <Col className="colHead" sm={{size:3}}>Story Info</Col>
               <Col className="colBody" sm={{size:8}}>{value.story_info}</Col>
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
export default connect(mapStateToProps,{getStoriesRequest})(Stories)
