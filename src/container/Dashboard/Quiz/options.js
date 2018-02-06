import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Row,Col} from 'reactstrap'

class Options extends Component{
  render(){
    console.log(this.props.value);
    if(this.props.value.is_right_choice===0){
    return(
       <Row key={this.props.index}>
       <Col className="colQuiz">{this.props.index+1}. {this.props.value.choice}</Col>
       </Row>
    )}
    else{
      return(
         <Row style={{"backgroundColor":"#f2f3f7"}} key={this.props.index}>
         <Col className="colBody">{this.props.index+1}. {this.props.value.choice}</Col>
         </Row>
      )
    }
  }

}

function mapStateToProps(state){
  return{
    data:state
  }
}

export default connect(mapStateToProps)(Options)
