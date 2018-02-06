import {GET_ADMIN_FAILURE,GET_ADMIN_SUCCESS,GET_ADMIN_REQUEST,host} from '../config';
import axios from 'axios';

export const getAdminsRequest=(auth_token,user_id)=>{
  console.log('GET admin ACTION');
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'GET',url:host+'/app2/admin/getadmins',headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            dispatch(getAdminsSuccess(response));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}

export const getAdminsSuccess=(response)=>{
  console.log('admin',response.data.data);
  return{
    type:GET_ADMIN_SUCCESS,
    admin_data:response.data.data
  }
}
