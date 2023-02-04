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

interface inventaryState {
  page: number;
  data: object;
  search: object;
  product: object;
  result: boolean;
}

const initialState: inventaryState = {
  page: 0,
  data: [],
  search: [],
  product: [],
  result: false
};

const inventaryReducer = (
  state: inventaryState = initialState,
  action:
    | listActionInterface
    | searchlistActionInterface
    | searchProductActionInterface
    | inputInventaryActionInterface
): inventaryState => {
  const { type, payload } = action;

  switch (type) {
    case listActionType.LIST_SUCCESS:
      return {
        ...state,
        data: payload
      };
    case searchListActionType.SEARCHLIST_SUCCESS:
      return {
        ...state,
        search: payload
      };
    case searchProductActionType.SEARCHPRODUCT_SUCCESS:
      return {
        ...state,
        product: payload
      };
    case inputInventaryActionType.IMPUTINVENTARY_SUCCESS:
      return {
        ...state,
        data: payload,
        result: true
      };
    case inputInventaryActionType.IMPUTINVENTARY_FAIL:
      return {
        ...state,
        product: payload
      };
    case searchListActionType.SEARCHLIST_FAIL:
      return {
        ...state,
        data: payload
      };
    case listActionType.LIST_FAIL:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default inventaryReducer;
