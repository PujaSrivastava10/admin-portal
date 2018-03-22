import {GET_BLOGS_REQUEST,GET_BLOGS_FAILURE,GET_BLOGS_SUCCESS,GET_BLOG_DETAILS,host} from '../config';
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

export const getBlogDetailsRequest=(auth_token,user_id,uuid)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/blog/getblogforadmin',
    data:{uuid:uuid},headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            console.log('response getblog',response);
            dispatch(getBlogDetailsSuccess(response));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject');
        reject({networkError: error.message})});
  })
  }
}

export const getBlogDetailsSuccess=(response)=>{
  console.log('response story details',response);
  return{
    type:GET_BLOG_DETAILS,
    blog_name:response.data.data[0].blog_name,
    blog_info:response.data.data[0].blog_info,
    blog_details:response.data.data[0].blog_details,
    image_link:response.data.data[0].image_link,
    updated_by:response.data.data[0].updated_by
  }
}

export const addBlogRequest=(auth_token,user_id,formData)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
     axios.post(host+'/app2/blog/create',formData,{headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
      console.log('response addcourses',response);
          if(response.data.status===200){
            dispatch(getBlogsRequest(auth_token,user_id));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}

export const updateBlogRequest=(auth_token,user_id,formData)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
     axios.post(host+'/app2/blog/update',formData,{headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
      console.log('response updatecourses',response);
      if(response.data.status===200){
        var uuid=formData.get("uuid");
        dispatch(getBlogDetailsRequest(auth_token,user_id,uuid));
      }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}

export const deleteBlogRequest=(auth_token,user_id,uuid)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/blog/delete',
    data:{uuid:uuid},headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            console.log('response getblog',response);
            dispatch(getBlogsRequest(auth_token,user_id,uuid));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject');
        reject({networkError: error.message})});
  })
  }
}
