import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Row,Col,Card,Form,FormGroup,Input,Button,Label,Table,Collapse,Modal} from 'reactstrap'
import NavbarDashboard from '../navbarDashboard'
import Sidebar from '../sidebar.js'
import {Redirect} from 'react-router'
import {getQuizesRequest} from '../../../actions'
import Options from './options';
import AddNewQuiz from './addNewQuiz'
class Quizes extends Component{
   constructor(props){
     super(props);
     this.state={data_present:false,
                  collapse:false,
                  optionCollapse:false,
                   quizKey:0,
                    questionKey:0,
                    modalAdd:false,
                     quizBorder:"none"}
   }
  componentDidMount(){
    console.log('auth_token',this.props.data.auth_token);
      this.props.getQuizesRequest(this.props.data.auth_token,this.props.data.user_id)
  }
  componentWillReceiveProps(nextProps){
    console.log('nextProps',nextProps);
      if(nextProps.data.quiz_data!==undefined){
        this.setState({data_present:true})
        console.log(nextProps.data.quiz_data[0]);
      }

}
toggle=()=> {
  console.log('key');
    this.setState({ collapse: !this.state.collapse });
  }
  optionToggle=()=> {
      this.setState({ optionCollapse: !this.state.optionCollapse });
    }
    toggleAdd=()=>{
      this.setState({
        modalAdd:!this.state.modalAdd
      });
    }
  render(){
    //let quizKey=0;
    console.log('quizKey',this.state.quizKey);
    if(!(this.props.data.logStatus)){
      return(
      <Redirect to='/'/>)
    }else if((this.props.data.logStatus)&&(this.state.data_present)){
    return(
    <Row>
    <Col xl={{size:12}}>
    <div>
    <NavbarDashboard />
    </div>
    <Row>
    <Col sm={{size:2}}>
    <Sidebar />
    </Col>
    <Col sm={{size:8,offset:1}} className="canvasforDashboard">
    <Row>
    <Col xs={{size:3}} className="title">Quizes </Col>
    <Col xs={{size:2,offset:7}}>
    <Button className="btn-add" onClick={this.toggleAdd}>Add New Quiz</Button>
    <Modal className="showModal" isOpen={this.state.modalAdd}>
    <AddNewQuiz toggleSubmit={this.toggleAdd}/>
    </Modal>
    </Col>
    </Row>
    <Card className="cardForDashboard">
    <div style={{padding:"20px"}}>
    <Row className="rowHead">
      <Col sm={{size:1}} className="colHead" >S.No.</Col>
      <Col sm={{size:3}} className="colHead" >Course Name</Col>
      <Col sm={{size:2}} className="colHead" >Quiz Name</Col>
      <Col sm={{size:2}} className="colHead" >Added by</Col>
      <Col sm={{size:2}} className="colHead" >Updated by</Col>
      <Col sm={{size:2}} className="colHead" >Status</Col>
      </Row>
          {this.props.data.quiz_data.map((value,key)=>
            <div key={key}>
            <Row className="rowBody" onClick={()=>{
                                  this.setState({
                                    collapse:!(this.state.collapse),
                                    quizKey:key,
                                    quizBorder:"1px solid #42d9f4"
                                  })
                                }}>
             <Col sm={{size:1}} className="colBody">{key+1}.</Col>
             <Col sm={{size:3}} className="colBody">{value.course_name}</Col>
             <Col sm={{size:2}} className="colBody">{value.quiz_name}</Col>
             <Col sm={{size:2}} className="colBody">{value.added_by}</Col>
             <Col sm={{size:2}} className="colBody">{value.updated_by}</Col>
             <Col sm={{size:2}} className="colBody">{value.status}</Col>
            </Row>
                 <Collapse isOpen={this.state.collapse&&(this.state.quizKey===key)} style={{"borderTop":"1px solid #42d9f4"}}>
                 <Row>
                 <Col sm={{size:8}} className="colHead" >Questions</Col>
                 <Col sm={{size:4}} className="colHead" >Total Marks</Col>
                 </Row>
                 {value.questions.map((value,key)=>
                  <div key={key}>
                 <Row style={{minHeight:"3rem"}} onClick={()=>{this.setState({
                                         optionCollapse:!(this.state.optionCollapse),
                                         questionKey:key
                                       })
                                     }}>
                 <Col sm={{size:8}} className="colBody">Q.{key+1} {value.question}</Col>
                 <Col sm={{size:4}} className="colBody">{value.marks}</Col>
                    </Row>
                  <Collapse isOpen={this.state.optionCollapse&&(this.state.questionKey===key)}
                  style={{"border-top":"1px solid #42d9f4","padding":"10px"}}>
                   <Row><Col className="colHead" style={{"minHeight":"2rem"}}>Options</Col></Row>
                  {value.options.map((value,key)=>
                    <Options key={key} value={value} index={key} />
                    )}
                    </Collapse>
                </div>
                  )}
               </Collapse>
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
export default connect(mapStateToProps,{getQuizesRequest})(Quizes)
