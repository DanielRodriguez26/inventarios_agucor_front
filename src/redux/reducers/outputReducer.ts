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
interface outputState {
  data: object;
  list: object;
  client: object;
  result: object;
}
const initialState: outputState = {
  data: [],
  list: [],
  client: [],
  result: []
};

const outputReducer = (
  state: outputState = initialState,
  action:
    | outputProviderActionInterface
    | outputClientActionInterface
    | outputSendActionInterface
    | outputListActionInterface
    | inputInventaryActionInterface
): outputState => {
  const { type, payload } = action;

  switch (type) {
    case outputProviderActionType.OUTPUTPROVIDER_SUCCESS:
      return {
        ...state,
        data: payload
      };
    case outputListActionType.OUTPUTLIST_SUCCESS:
      return {
        ...state,
        list: payload
      };
    case outputClientActionType.OUTPUTCLIENTE_SUCCESS:
      return {
        ...state,
        client: payload
      };
    case inputInventaryActionType.INPUTINVENTARY_SUCCESS:
    case outputSendActionType.OUTPUTSEND_SUCCESS:
      return {
        ...state,
        result: payload
      };
    case outputSendActionType.OUTPUTSEND_FAIL:
    case outputListActionType.OUTPUTLIST_FAIL:
    case outputClientActionType.OUTPUTCLIENTE_FAIL:
    case outputProviderActionType.OUTPUTPROVIDER_FAIL:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default outputReducer;
