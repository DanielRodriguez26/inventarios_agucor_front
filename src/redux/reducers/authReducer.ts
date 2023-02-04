import {
  authActionType,
  userLoadActionType,
  signupActionType,
  signinActionType
} from '../types/authType';
import {
  authAtionInterface,
  userLoadAtionInterface,
  signupAtionInterface,
  signinAtionInterface
} from '../interfaces/authInterface';

interface userState {
  data: object;
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean | null;
  user: object;
  loading: boolean;
}

const initialState: userState = {
  data: [],
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: [],
  loading: false
};

const authReducer = (
  state: userState = initialState,
  action:
    | authAtionInterface
    | signupAtionInterface
    | signinAtionInterface
    | userLoadAtionInterface
): userState => {
  const { type, payload } = action;

  switch (type) {
    case signinActionType.SIGNIN_SUCCESS:
      localStorage.setItem('access', payload.access);
      localStorage.setItem('refresh', payload.refresh);
      return {
        ...state,
        isAuthenticated: true
      };
    case authActionType.AUTHENTICATED_SUCCESS:
      return {
        ...state,
        data: payload
      };
    case userLoadActionType.USERLOAD_SUCCESS:
      localStorage.removeItem('users');
      const userArr = localStorage.getItem('users') || '[]';
      localStorage.setItem('users', JSON.stringify([payload, ...JSON.parse(userArr)]));
      return {
        ...state,
        user: payload
      };
    case authActionType.AUTHENTICATED_FAIL:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
        ...state,
        data: payload
      };
    case userLoadActionType.USERLOAD_FAIL:
      return {
        ...state,
        user: []
      };
    case signinActionType.SIGNIN_FAIL:
    case signupActionType.SIGNUP_SUCCESS:
    case signupActionType.SIGNUP_FAIL:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        data: [],
        user: []
      };
    default:
      return state;
  }
};

export default authReducer;
