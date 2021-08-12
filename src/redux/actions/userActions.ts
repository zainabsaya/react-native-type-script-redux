import axios from 'axios';
import { Dispatch } from 'react';
import { BASE_URL } from '../../utils';

export interface UserModel {
  id : number;
  title: string;
}

export interface LoginAction {
  readonly type: 'ON_LOGIN';
  payload: UserModel;
}

export interface ErrorAction {
  readonly type: 'ON_ERROR';
  payload: any;
}

export type UserAction = LoginAction | ErrorAction;

// we need to dispatch action
export const onLogin = (email: string, password: string) => {
  console.log("email",email ,"password",password)
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.get<UserModel>('https://jsonplaceholder.typicode.com/todos/1')
     

      if (!response) {
        // console.log("response",response)
        dispatch({
          type: 'ON_ERROR',
          payload: 'Login issue with API',
        });
      } else {
        dispatch({
          type: 'ON_LOGIN',
          payload: response.data,
        });
        console.log("response",response.data)

      }
    } catch (error) {
      dispatch({
        type: 'ON_ERROR',
        payload: error,
      });
    }
  };
};
