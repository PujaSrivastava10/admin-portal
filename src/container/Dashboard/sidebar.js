import React,{Component} from 'react';
import {ListGroup,ListGroupItem} from 'reactstrap';
import {FaEdit,FaPencilSquare,FaProductHunt,FaQuestionCircle,FaRssSquare,FaTwitch,FaUser,FaUserSecret,FaPlusSquare} from 'react-icons/lib/fa';
import {MdPeople} from 'react-icons/lib/md/people';
import {NavLink} from 'react-router-dom';

export default class Sidebar extends Component {
  constructor(props) {
  super(props);
  }
  render(){
    return(
      <ListGroup className="sidebar">

      <NavLink className="listGroupItem list-group-item" activeClassName="activelistGroupItem"  to='/dashboard/Courses'>
      <FaPencilSquare/>  Courses</NavLink>


      <NavLink className="listGroupItem list-group-item" activeClassName="activelistGroupItem"  to='/dashboard/Stories'>
      <FaTwitch />   Stories</NavLink>

      <NavLink className="listGroupItem list-group-item" activeClassName="activelistGroupItem"  to='/dashboard/Blogs'>
      <FaRssSquare />  Blogs</NavLink>

      <NavLink className="listGroupItem list-group-item" activeClassName="activelistGroupItem"  to='/dashboard/Projects'>
      <FaProductHunt />  Projects</NavLink>


      <NavLink className="listGroupItem list-group-item" activeClassName="activelistGroupItem"  to='/dashboard/Quizes'>
      <FaQuestionCircle />  Quizes</NavLink>

      <NavLink className="listGroupItem list-group-item" activeClassName="activelistGroupItem" to='/dashboard/Users'>
      <FaUser />  Users</NavLink>

      <NavLink className="listGroupItem list-group-item" activeClassName="activelistGroupItem"  to='/dashboard/Admins'>
      <FaUserSecret />  Admin</NavLink>

      </ListGroup>
    )
  }
}
