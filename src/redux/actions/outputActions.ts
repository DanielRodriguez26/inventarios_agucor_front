import {
  outputProviderActionType,
  outputClientActionType,
  outputSendActionType,
  outputListActionType,
  inputInventaryActionType
} from '../types/outputType';
import {
  outputProviderActionInterface,
  outputClientActionInterface,
  outputSendActionInterface,
  outputListActionInterface,
  inputInventaryActionInterface
} from '../interfaces/outputInterface';
import { Dispatch } from 'react';
import axios from 'axios';

//---------------Output Povider List---------------
export const outputProviderAction =
  () => async (dispatch: Dispatch<outputProviderActionInterface>) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/outputs/`,

          config
        );
        if (res.status === 200) {
          dispatch({
            type: outputProviderActionType.OUTPUTPROVIDER_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: outputProviderActionType.OUTPUTPROVIDER_FAIL,
            payload: res.data.data
          });
        }
      } catch (error: any) {
        dispatch({
          type: outputProviderActionType.OUTPUTPROVIDER_FAIL,
          payload: error
        });
      }
    }
  };

//---------------Output Clint List---------------
export const searchOutputTypeAction =
  (ci_output_type: string) => async (dispatch: Dispatch<outputClientActionInterface>) => {
    if (localStorage.getItem('access')) {
      const config: object = {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const body = {
        ci_output_type
      };

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/outputs/`,
          body,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: outputClientActionType.OUTPUTCLIENTE_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: outputClientActionType.OUTPUTCLIENTE_FAIL,
            payload: res.data
          });
        }
      } catch (error: any) {
        dispatch({
          type: outputClientActionType.OUTPUTCLIENTE_FAIL,
          payload: error
        });
      }
    }
  };

//---------------Output Send---------------

export const sendOutputTypeAction =
  (outputInventary: any) => async (dispatch: Dispatch<outputSendActionInterface>) => {
    if (localStorage.getItem('access')) {
      const config: object = {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const user = 'daniel.rodriguezc037@gmail.com';
      const body = {
        outputInventary,
        user
      };

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/outputs/send/`,
          body,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: outputSendActionType.OUTPUTSEND_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: outputSendActionType.OUTPUTSEND_FAIL,
            payload: res.data
          });
        }
      } catch (error: any) {
        dispatch({
          type: outputSendActionType.OUTPUTSEND_FAIL,
          payload: error
        });
      }
    }
  };

export const outputListAction =
  (
    oi_category: string,
    oi_provider: string,
    oi_product: string,
    oi_color: string,
    oi_size: string,
    oi_client: string,
    oi_output_type: string,
    oi_until: string,
    oi_since: string,
    pageNext: number
  ) =>
  async (dispatch: Dispatch<outputListActionInterface>) => {
    if (localStorage.getItem('access')) {
      const config: object = {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const body = {
        oi_category,
        oi_provider,
        oi_product,
        oi_color,
        oi_size,
        oi_client,
        oi_output_type,
        oi_until,
        oi_since,
        pageNext
      };

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/outputs/list/`,
          body,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: outputListActionType.OUTPUTLIST_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: outputListActionType.OUTPUTLIST_FAIL,
            payload: res.data
          });
        }
      } catch (error: any) {
        dispatch({
          type: outputListActionType.OUTPUTLIST_FAIL,
          payload: error
        });
      }
    }
  };

//---------------Input Inevtary---------------

export const inputInventaryTypeAction =
  (id: any) => async (dispatch: Dispatch<inputInventaryActionInterface>) => {
    if (localStorage.getItem('access')) {
      const config: object = {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const user = 'daniel.rodriguezc037@gmail.com';
      const body = {
        id,
        user
      };

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/outputs/input/`,
          body,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: inputInventaryActionType.INPUTINVENTARY_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: inputInventaryActionType.INPUTINVENTARY_FAIL,
            payload: res.data
          });
        }
      } catch (error: any) {
        dispatch({
          type: inputInventaryActionType.INPUTINVENTARY_FAIL,
          payload: error
        });
      }
    }
  };
