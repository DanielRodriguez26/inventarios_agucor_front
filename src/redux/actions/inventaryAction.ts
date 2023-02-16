import {
  listActionType,
  searchListActionType,
  searchProductActionType,
  inputInventaryActionType
} from '../types/inventaryType';
import {
  listActionInterface,
  searchlistActionInterface,
  searchProductActionInterface,
  inputInventaryActionInterface
} from '../interfaces/inventaryInterface';
import { Dispatch } from 'react';
import axios from 'axios';

export const inventaryListAction =
  (
    inv_category: string,
    inv_provider: string,
    inv_color: string,
    inv_product: string,
    inv_size: string,
    inv_since: string,
    inv_until: string,
    pageNext: number
  ) =>
  async (dispatch: Dispatch<listActionInterface>) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const body = {
        inv_size,
        inv_product,
        inv_color,
        inv_category,
        inv_provider,
        inv_since,
        inv_until,
        pageNext
      };

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/inventary/`,
          body,
          config
        );
        if (res.status === 200) {
          dispatch({
            type: listActionType.LIST_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: listActionType.LIST_FAIL,
            payload: res.data.data
          });
        }
      } catch (error: any) {
        dispatch({
          type: listActionType.LIST_FAIL,
          payload: error
        });
      }
    }
  };

export const searchListAction =
  () => async (dispatch: Dispatch<searchlistActionInterface>) => {
    if (localStorage.getItem('access')) {
      const config: object = {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/inventary/search/`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: searchListActionType.SEARCHLIST_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: searchListActionType.SEARCHLIST_FAIL,
            payload: res.data
          });
        }
      } catch (error: any) {
        dispatch({
          type: searchListActionType.SEARCHLIST_FAIL,
          payload: error
        });
      }
    }
  };

export const searchProcutAction =
  (pt_provider: string) => async (dispatch: Dispatch<searchProductActionInterface>) => {
    if (localStorage.getItem('access')) {
      const config: object = {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const body = {
        pt_provider
      };

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/inventary/search/`,
          body,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: searchProductActionType.SEARCHPRODUCT_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: searchProductActionType.SEARCHPRODUCT_FAIL,
            payload: res.data
          });
        }
      } catch (error: any) {
        dispatch({
          type: searchProductActionType.SEARCHPRODUCT_FAIL,
          payload: error
        });
      }
    }
  };

//---------------Input Inventary--------------
export const inputInventaryAction =
  (id: number, inv_unit_value: number, inv_amount: number, invoice: string) =>
  async (dispatch: Dispatch<inputInventaryActionInterface>) => {
    if (localStorage.getItem('access')) {
      const config: object = {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const aud_create = JSON.parse(localStorage.getItem('users') || '[]');
      const aud_create_by = `${aud_create[0].first_name} ${aud_create[0].last_name}`;
      const body = {
        id,
        inv_unit_value,
        inv_amount,
        invoice,
        aud_create_by
      };

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/inventary/input/`,
          body,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: inputInventaryActionType.IMPUTINVENTARY_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: inputInventaryActionType.IMPUTINVENTARY_FAIL,
            payload: res.data
          });
        }
      } catch (error: any) {
        dispatch({
          type: inputInventaryActionType.IMPUTINVENTARY_FAIL,
          payload: error
        });
      }
    }
  };
