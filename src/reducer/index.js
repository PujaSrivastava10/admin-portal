import {ADMIN_LOGIN_REQUEST,ADMIN_LOGIN_SUCCESS,LOGOUT,GET_COURSES_SUCCESS,GET_STORIES_SUCCESS,GET_BLOGS_SUCCESS,
  GET_PROJECTS_SUCCESS,GET_QUIZES_SUCCESS,GET_USERS_SUCCESS,GET_ADMIN_SUCCESS,GET_STORIES_DETAILS
} from '../config';
import {read_cookie,bake_cookie} from 'sfcookies';

const userReducer=(state={},actions)=>{
  let data=null;
  state=read_cookie('data')
  console.log('reducer');
   switch(actions.type){

    case ADMIN_LOGIN_REQUEST:
   case ADMIN_LOGIN_SUCCESS:
         data=Object.assign({},state,{
           username:actions.username,
           auth_token:actions.auth_token,
           logStatus:actions.logStatus,
            user_id:actions.user_id});
            bake_cookie('data',data)
         console.log('USER_LOGIN_SUCCESS REDUCER',data);
         return data;
  case GET_COURSES_SUCCESS:
        data=Object.assign({},state,{course_data:actions.course_data})
        bake_cookie('course_data',data)
        return data;
  case GET_STORIES_SUCCESS:
        data=Object.assign({},state,{story_data:actions.story_data})
        bake_cookie('story_data',data)
        return data;

  case GET_BLOGS_SUCCESS:
        data=Object.assign({},state,{blog_data:actions.blog_data})
        return data;
  case GET_PROJECTS_SUCCESS:
          data=Object.assign({},state,{project_data:actions.project_data})
          return data;
  case GET_QUIZES_SUCCESS:
          data=Object.assign({},state,{quiz_data:actions.quiz_data})
          return data;
  case GET_USERS_SUCCESS:
          data=Object.assign({},state,{user_data:actions.user_data})
          console.log('REDUDER USERS',data);
          return data;
  case GET_ADMIN_SUCCESS:
          data=Object.assign({},state,{admin_data:actions.admin_data})
          console.log('REDUDER USERS',data);
          return data;
   case LOGOUT:
        data=actions.logStatus;
        bake_cookie('data',data)
        return data;
   default:
   console.log('default');
   return state;
 }
}

export default userReducer
