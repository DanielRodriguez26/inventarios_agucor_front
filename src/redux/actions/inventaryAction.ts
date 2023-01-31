import {
  listActionType,
  searchListActionType,
  searchProductActionType
} from '../types/inventaryType';
import {
  listActionInterface,
  searchlistActionInterface,
  searchProductActionInterface
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
    inv_until: string
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
        inv_until
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
            payload: res.data.data
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
