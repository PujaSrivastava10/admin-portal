import {GET_COURSES_REQUEST,GET_COURSES_FAILURE,GET_COURSES_SUCCESS,GET_COURSES_DETAILS,host,
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

export const getCoursesDetailsRequest=(auth_token,user_id,uuid)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/course/getcourseforadmin',
    data:{uuid:uuid},headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            console.log('response geTCOURSE',response);
            dispatch(getCoursesDetailsSuccess(response));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject');
        reject({networkError: error.message})});
  })
  }
}

export const getCoursesDetailsSuccess=(response)=>{
  console.log('response story details',response);
  return{
    type:GET_COURSES_DETAILS,
    course_name:response.data.data[0].course_name,
    course_info:response.data.data[0].course_info,
    course_details:response.data.data[0].course_details,
    course_logo:response.data.data[0].course_logo,
    video_link:response.data.data[0].video_link,
    updated_by:response.data.data[0].updated_by
  }
}

export const addCoursesRequest=(auth_token,user_id,formData)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
     axios.post(host+'/app2/course/create',formData,{headers:{auth_token:auth_token,user_id:user_id}})
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



export const updateCourseRequest=(auth_token,user_id,formData)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
     axios.post(host+'/app2/course/update',formData,{headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
      console.log('response update course',response);
      if(response.data.status===200){
        console.log('project actions update uuid:::::::',formData.get("uuid"));
        var uuid=formData.get("uuid");
        dispatch(getCoursesDetailsRequest(auth_token,user_id,uuid));
      }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject update story'); reject({
          networkError: error.message,
      })});
  });
}}

export const deleteCourseRequest=(auth_token,user_id,uuid)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/course/delete',
    data:{uuid:uuid},headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            console.log('response getProject',response);
            dispatch(getCoursesRequest(auth_token,user_id,uuid));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject');
        reject({networkError: error.message})});
  })
  }
}
