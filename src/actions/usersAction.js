import {GET_USERS_FAILURE,GET_USERS_SUCCESS,GET_USERS_REQUEST,host} from '../config';
import axios from 'axios';

export const getUsersRequest=(auth_token,user_id)=>{
  console.log('GET USER ACTION');
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'GET',url:host+'/app2/admin/getusers',headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            dispatch(getUsersSuccess(response));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}

export const getUsersSuccess=(response)=>{
  console.log('SUCEESS',response.data.data);
  return{
    type:GET_USERS_SUCCESS,
    user_data:response.data.data
  }
}
