import {
  listActionType,
  searchListActionType,
  searchProductActionType
} from '../types/inventaryType';

export interface inventaryInterface {
  id: number;
  inv_category: string;
  inv_provider: string;
  inv_color: string;
  inv_product: string;
  inv_ref: string;
  inv_measure: string;
  inv_size: string;
  inv_amount: number;
  inv_unit_value: number;
  inv_total: number;
  inv_create_at: string;
  inv_update_at: string;
}

export interface inventaryFailInterface {
  message: string;
}

//---------------Inventary List---------------
interface listSuccessAction {
  type: listActionType.LIST_SUCCESS;
  payload: inventaryInterface | inventaryFailInterface;
}

interface listFailAction {
  type: listActionType.LIST_FAIL;
  payload: inventaryFailInterface;
}

export type listActionInterface = listSuccessAction | listFailAction;

//---------------Search List---------------
interface searchlistSuccessAction {
  type: searchListActionType.SEARCHLIST_SUCCESS;
  payload: inventaryInterface | inventaryFailInterface;
}

interface searchlistFailAction {
  type: searchListActionType.SEARCHLIST_FAIL;
  payload: inventaryFailInterface;
}

export type searchlistActionInterface = searchlistSuccessAction | searchlistFailAction;

//---------------Search List---------------
interface searchProductSuccessAction {
  type: searchProductActionType.SEARCHPRODUCT_SUCCESS;
  payload: inventaryInterface | inventaryFailInterface;
}

interface searchProductFailAction {
  type: searchProductActionType.SEARCHPRODUCT_FAIL;
  payload: inventaryFailInterface;
}

export type searchProductActionInterface =
  | searchProductSuccessAction
  | searchProductFailAction;
