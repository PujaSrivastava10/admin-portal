import {GET_STORIES_FAILURE,GET_STORIES_SUCCESS,GET_STORIES_REQUEST,
  GET_STORIES_DETAILS,host} from '../config';
import axios from 'axios';

export const getStoriesRequest=(auth_token,user_id)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/story/getstoryforadmin',headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            console.log('response getstory',response);
            dispatch(getStoriesSuccess(response));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}


export const getStoriesSuccess=(response)=>{
  console.log(response.data.data);
  return{
    type:GET_STORIES_SUCCESS,
    story_data:response.data.data
  }
}

export const getStoriesDetailsRequest=(auth_token,user_id,uuid)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/story/getstoryforadmin',
    data:{uuid:uuid},headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            console.log('response getstory',response);
            dispatch(getStoriesDetailsSuccess(response));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject');
        reject({networkError: error.message})});
  })
  }
}

export const getStoriesDetailsSuccess=(response)=>{
  console.log('response story details',response);
  return{
    type:GET_STORIES_DETAILS,
    story_name:response.data.data[0].story_name,
    story_info:response.data.data[0].story_info,
    story_details:response.data.data[0].story_details,
    image_link:response.data.data[0].image_link,
    thumbnail_image_link:response.data.data[0].thumbnail_image_link,
    updated_by:response.data.data[0].updated_by
  }
}


export const addStoriesRequest=(auth_token,user_id,formData)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
     axios.post(host+'/app2/story/create',formData,{headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
      console.log('response addcourses',response);
          if(response.data.status===200){
            dispatch(getStoriesRequest(auth_token,user_id));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}

export const updateStoriesRequest=(auth_token,user_id,formData)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
     axios.post(host+'/app2/story/update',formData,{headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
      console.log('response update story',response);
      if(response.data.status===200){
        console.log('project actions update uuid:::::::',formData.get("uuid"));
        var uuid=formData.get("uuid");
        dispatch(getStoriesDetailsRequest(auth_token,user_id,uuid));
      }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject update story'); reject({
          networkError: error.message,
      })});
  });
}}

export const deleteStoryRequest=(auth_token,user_id,uuid)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/story/delete',
    data:{uuid:uuid},headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            console.log('response getProject',response);
            dispatch(getStoriesRequest(auth_token,user_id,uuid));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject');
        reject({networkError: error.message})});
  })
  }
}
