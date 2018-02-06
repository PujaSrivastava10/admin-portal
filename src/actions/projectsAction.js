import {GET_PROJECTS_REQUEST,GET_PROJECTS_FAILURE,GET_PROJECTS_SUCCESS,host} from '../config';
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
    project_data:response.data.data
  }
}
