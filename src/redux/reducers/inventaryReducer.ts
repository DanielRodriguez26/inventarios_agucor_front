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

interface inventaryState {
  data: object;
  search: object;
  product: object;
}

const initialState: inventaryState = {
  data: [],
  search: [],
  product: []
};

const inventaryReducer = (
  state: inventaryState = initialState,
  action: listActionInterface | searchlistActionInterface | searchProductActionInterface
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
