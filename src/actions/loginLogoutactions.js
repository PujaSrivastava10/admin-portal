import {ADMIN_LOGIN_REQUEST,host,ADMIN_LOGIN_SUCCESS,ADMIN_LOGIN_FAILURE,LOGOUT} from '../config';
import axios from 'axios';

export const adminLoginRequest=(email_id,password)=>{
  return dispatch => {
    axios.post(host+'/app2/admin/login',{email_id:email_id,password:password})
    .then((response)=>{return response}).then((response)=>{
      if(response.data.status===200){
        console.log('login response',response);
        dispatch(adminLoginSuccess(response));
      }
      else{
        dispatch(adminLoginFailure(response));
      }
    }).catch((error)=>{
        console.log('error message',error);
    })
   }
  }

export const adminLoginSuccess=(response)=>{
  return{
    type:ADMIN_LOGIN_SUCCESS,
    username:response.data.data.name,
    auth_token:response.data.data.auth_token,
    status:response.data.status,
    user_id:response.data.data.user_id,
    logStatus:true
  }
}
export const adminLoginFailure=(response)=>{
  return{
    type:ADMIN_LOGIN_FAILURE,
    message:response.data.message,
    status:response.data.status
  }
}
export const logout=(status)=>{
  return{
    type:LOGOUT,
    logStatus:false,
    status:status
  }
}

export const adminLogoutRequest=(auth_token,user_id)=>{
  return dispatch => {
    axios.get(host+'/app2/admin/logout',{headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
      if(response.data.status===200){
        console.log('logout response data');
        dispatch(logout(response.data.status));
      }
    }).catch((error)=>{
      console.log('error message',error);
    })
   }
}
