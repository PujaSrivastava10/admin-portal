import {ADMIN_LOGIN_REQUEST,ADMIN_LOGIN_SUCCESS,LOGOUT,GET_COURSES_SUCCESS,GET_COURSES_DETAILS,GET_STORIES_SUCCESS,
  GET_BLOGS_SUCCESS,GET_BLOG_DETAILS,
  GET_PROJECTS_SUCCESS,GET_PROJECT_DETAILS,GET_QUIZES_SUCCESS,GET_USERS_SUCCESS,GET_ADMIN_SUCCESS,GET_STORIES_DETAILS
} from '../config';
import {read_cookie,bake_cookie,delete_cookie} from 'sfcookies';

const userReducer=(state={},actions)=>{
  let data=null;
   state=read_cookie('data');
  console.log('reducer');
   switch(actions.type){
    case ADMIN_LOGIN_REQUEST:
   case ADMIN_LOGIN_SUCCESS:
        //state=JSON.parse(localStorage.getItem('data'));
         data=Object.assign({},state,{
           username:actions.username,
           auth_token:actions.auth_token,
           logStatus:actions.logStatus,
            user_id:actions.user_id});
            bake_cookie('data',data)
            window.localStorage.setItem('data',JSON.stringify(data));
         console.log('USER_LOGIN_SUCCESS REDUCER',data);
         return data;
  case GET_COURSES_SUCCESS:
         state=JSON.parse(localStorage.getItem('data'));
         console.log('courses state',state);
        data=Object.assign({},state,{course_data:actions.course_data})
        localStorage.setItem('data',JSON.stringify(data));
        return data;
  case GET_COURSES_DETAILS:
        state=JSON.parse(localStorage.getItem('data'));
        data=Object.assign({},state,{
          course_name:actions.course_name,
          course_info:actions.course_info,
          course_details:actions.course_details,
          course_logo:actions.course_logo,
          video_link:actions.video_link,
          updated_by:actions.updated_by
        })
        localStorage.setItem('data',JSON.stringify(data));
        return data;
  case GET_STORIES_SUCCESS:
        state=JSON.parse(localStorage.getItem('data'));
        console.log('stories state',state);
        data=Object.assign({},state,{story_data:actions.story_data})
        localStorage.setItem('data',JSON.stringify(data));
        return data;
  case GET_STORIES_DETAILS:
        state=JSON.parse(localStorage.getItem('data'));
        data=Object.assign({},state,{
          story_details:actions.story_details,
          story_name:actions.story_name,
          story_info:actions.story_info,
          image_link:actions.image_link,
          thumbnail_image_link:actions.thumbnail_image_link,
          updated_by:actions.updated_by
        })
        localStorage.setItem('data',JSON.stringify(data));
        return data;

  case GET_BLOGS_SUCCESS:
        state=JSON.parse(localStorage.getItem('data'));
        console.log('blog state',state);
        data=Object.assign({},state,{blog_data:actions.blog_data})
        localStorage.setItem('data',JSON.stringify(data));
        return data;

    case GET_BLOG_DETAILS:
          state=JSON.parse(localStorage.getItem('data'));
          data=Object.assign({},state,{
            blog_details:actions.blog_details,
            blog_name:actions.blog_name,
            blog_info:actions.blog_info,
            image_link:actions.image_link,
            updated_by:actions.updated_by
          })
          localStorage.setItem('data',JSON.stringify(data));
          return data;
  case GET_PROJECTS_SUCCESS:
         state=JSON.parse(localStorage.getItem('data'));
          data=Object.assign({},state,{project_data:actions.project_data})
          localStorage.setItem('data',JSON.stringify(data));
          return data;
  case GET_PROJECT_DETAILS:
          state=JSON.parse(localStorage.getItem('data'));
          data=Object.assign({},state,{
            project_name:actions.project_name,
            project_info:actions.project_info,
            image_link:actions.image_link,
            project_details:actions.project_details,
          updated_by:actions.updated_by})
          localStorage.setItem('data',JSON.stringify(data));
          return data;
  case GET_QUIZES_SUCCESS:
         state=JSON.parse(localStorage.getItem('data'));
          data=Object.assign({},state,{quiz_data:actions.quiz_data})
          localStorage.setItem('data',JSON.stringify(data));
          return data;
  case GET_USERS_SUCCESS:
         state=JSON.parse(localStorage.getItem('data'));
          data=Object.assign({},state,{user_data:actions.user_data})
          localStorage.setItem('data',JSON.stringify(data));
          console.log('REDUDER USERS',data);
          return data;
  case GET_ADMIN_SUCCESS:
         state=JSON.parse(localStorage.getItem('data'));
          data=Object.assign({},state,{admin_data:actions.admin_data})
          localStorage.setItem('data',JSON.stringify(data));
          console.log('REDUDER USERS',data);
          return data;
   case LOGOUT:
       state=JSON.parse(localStorage.getItem('data'));
        data=Object.assign({},actions.logStatus);
        delete_cookie('data')
        window.localStorage.removeItem('data');
        return data;
   default:
   console.log('default');
   return state;
 }
}

export default userReducer
