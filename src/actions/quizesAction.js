import {GET_QUIZES_FAILURE,GET_QUIZES_SUCCESS,GET_QUIZES_REQUEST,host} from '../config';
import axios from 'axios';

export const getQuizesRequest=(auth_token,user_id)=>{
  return dispatch=>{
  return new Promise((resolve, reject) => {
    axios({method:'POST',url:host+'/app2/quiz/getquizforadmin',headers:{auth_token:auth_token,user_id:user_id}})
    .then((response)=>{return response}).then((response)=>{
          if(response.data.status===200){
            dispatch(getQuizesSuccess(response));
          }
          return resolve(response.data.status);
        }).catch((error) =>  {console.log('reject'); reject({
          networkError: error.message,
      })});
  });
}}
export const getQuizesSuccess=(response)=>{
  console.log(response.data.data);
  return{
    type:GET_QUIZES_SUCCESS,
    quiz_data:response.data.data
  }
}
