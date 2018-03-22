import {GET_PROJECTS_REQUEST,GET_PROJECTS_FAILURE,GET_PROJECTS_SUCCESS,GET_PROJECT_DETAILS,host} from '../config';
import axios from 'axios';

export const getProjectsRequest=(auth_token,user_id)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/project/getprojectforadmin',headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            dispatch(getProjectsSuccess(response));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}

export const getProjectsSuccess=(response)=>{
  console.log(response.data.data);
  return{
    type:GET_PROJECTS_SUCCESS,
    project_data:response.data.data,

  }
}

export const getProjectDetailsRequest=(auth_token,user_id,uuid)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/project/getprojectforadmin',
    data:{uuid:uuid},headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            console.log('response get project details',response);
            dispatch(getProjectDetailsSuccess(response));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject');
        reject({networkError: error.message})});
  })
  }
}

export const getProjectDetailsSuccess=(response)=>{
  console.log('response story details',response);
  return{
    type:GET_PROJECT_DETAILS,
    project_name:response.data.data[0].project_name,
    project_info:response.data.data[0].project_info,
    project_details:response.data.data[0].project_details,
    image_link:response.data.data[0].image_link,
    updated_by:response.data.data[0].updated_by

  }
}

export const addProjectRequest=(auth_token,user_id,formData)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
     axios.post(host+'/app2/project/create',formData,{headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
      console.log('response addcourses',response);
          if(response.data.status===200){
            dispatch(getProjectsRequest(auth_token,user_id));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}

export const updateProjectsRequest=(auth_token,user_id,formData)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
     axios.post(host+'/app2/project/update',formData,{headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
      console.log('response updatecourses',response);
      if(response.data.status===200){
        console.log('project actions update uuid:::::::',formData.get("uuid"));
        var uuid=formData.get("uuid");
        dispatch(getProjectDetailsRequest(auth_token,user_id,uuid));
      }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}

export const deleteProjectRequest=(auth_token,user_id,uuid)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/project/delete',
    data:{uuid:uuid},headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            console.log('response getProject',response);
            dispatch(getProjectsRequest(auth_token,user_id,uuid));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject');
        reject({networkError: error.message})});
  })
  }
}
