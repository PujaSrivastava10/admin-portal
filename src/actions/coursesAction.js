import {GET_COURSES_REQUEST,GET_COURSES_FAILURE,GET_COURSES_SUCCESS,host,
ADD_COURSES_SUCCESS,ADD_COURSES_FAILURE} from '../config';
import axios from 'axios';

export const getCoursesRequest=(auth_token,user_id)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/course/getcourseforadmin',headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            console.log('courses response',response);
            dispatch(getCourseSuccess(response));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}

export const getCourseSuccess=(response)=>{
  console.log(response.data.data);
  return{
    type:GET_COURSES_SUCCESS,
    course_data:response.data.data
  }
}

export const addCoursesRequest=(auth_token,user_id,state)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/course/create',
    data:{course_name:state.course_name,video_link:state.video_link,
      course_details:state.course_details,course_info:state.course_info},
    headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
      console.log('response addcourses',response);
          if(response.data.status===200){
            dispatch(getCoursesRequest(auth_token,user_id));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}



export const updateCourseRequest=(auth_token,user_id,state,uuid)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/course/update',
    data:{course_name:state.course_name,video_link:state.video_link,
      course_info:state.course_info,uuid:uuid},
    headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
      console.log('response updatecourses',response);
          if(response.data.status===200){
            dispatch(getCoursesRequest(auth_token,user_id));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}
