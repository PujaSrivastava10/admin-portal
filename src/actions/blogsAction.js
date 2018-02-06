import {GET_BLOGS_REQUEST,GET_BLOGS_FAILURE,GET_BLOGS_SUCCESS,host} from '../config';
import axios from 'axios';

export const getBlogsRequest=(auth_token,user_id)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/blog/getblogforadmin',headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            dispatch(getBlogsSuccess(response));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}

export const getBlogsSuccess=(response)=>{
  console.log('response',response.data.data);
  return{
    type:GET_BLOGS_SUCCESS,
    blog_data:response.data.data
  }
}
