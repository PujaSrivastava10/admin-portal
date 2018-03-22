import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Row,Col,Card,Form,FormGroup,Input,Button,Label,Table,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import NavbarDashboard from '../navbarDashboard'
import {FaEdit} from 'react-icons/lib/fa';
import Sidebar from '../sidebar.js'
import {Redirect} from 'react-router'
import {getCoursesRequest} from '../../../actions'
import AddNewCourse from './addNewCourse'
import ShowModal from './showModal'
class Courses extends Component{
   constructor(props){
     super(props);
     this.state={data_present:false,modal: false,modalAdd:false,courseKey:'',addCourse:false}
   }
  componentDidMount(){
    console.log('auth_token courses',this.props.data.auth_token);
      this.props.getCoursesRequest(this.props.data.auth_token,this.props.data.user_id)
  }
  componentWillReceiveProps(nextProps){
    console.log('auth_token next courses',nextProps.data.auth_token);
      if(nextProps.data.course_data!==undefined){
        this.setState({data_present:true})
        const data1=nextProps.data.course_data[0]
      }

}
toggle=()=>{
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggleAdd=()=>{
    this.setState({
      modalAdd:!this.state.modalAdd
    });
  }
  handleAddCourse=()=>{
    console.log('button');
    this.setState({addCourse:true})
  }

  render(){

    const {courses} = this.props.data;
    if(!(this.props.data.logStatus)){
      return(
      <Redirect to='/'/>)
    }
    else if((this.props.data.logStatus)&&(this.state.data_present)){
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
    <Col xs={{size:3}} className="title">Courses </Col>
    <Col xs={{size:2,offset:7}}>
    <Button className="btn-add" onClick={this.toggleAdd}>Add New Courses</Button>
    <Modal className="showModal" isOpen={this.state.modalAdd}>
    <AddNewCourse toggleSubmit={this.toggleAdd}/>
    </Modal>
    </Col>
    </Row>
    <Card className="cardForDashboard">
    <Row className="rowHead">
      <Col className="colHead" sm={{size:1}}>S.No.</Col>
      <Col className="colHead" sm={{size:3}}>Course Name</Col>
      <Col className="colHead" sm={{size:3}}>Added by</Col>
      <Col className="colHead" sm={{size:3}}>Updated by</Col>
      <Col className="colHead" sm={{size:2}}>Status</Col>
    </Row>
      <div>
       {this.props.data.course_data.map((value,key)=>
         <div key={key}>
         <Row className="rowBody" onClick={()=>{
                                  this.setState({
                                    modal:!(this.state.modal),
                                   courseKey:key})}}>
             <Col className="colBody" sm={{size:1}}>{key+1}.</Col>
             <Col className="colBody" sm={{size:3}}>{value.course_name}</Col>
             <Col className="colBody"sm={{size:3}}>{value.added_by}</Col>
              <Col className="colBody"sm={{size:3}}>{value.updated_by}</Col>
             <Col className="colBody" sm={{size:2}}>{value.status}</Col>
           </Row>
          <Modal className="showModal" isOpen={this.state.modal&&(this.state.courseKey===key)}>
          <ShowModal index={key} toggle={this.toggle}/>
         </Modal>
        </div>
      )}
      </div>
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
export default connect(mapStateToProps,{getCoursesRequest})(Courses)
