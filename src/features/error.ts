import { ErrorText } from '../types/ErrorText';

type SetAction = { type: 'error/SET', payload: ErrorText };
type Action = SetAction;

const set = (value: ErrorText): SetAction => ({ type: 'error/SET', payload: value });

export const errorActions = { set };

const errorReducer = (error: ErrorText = ErrorText.NONE, action: Action) => {
  switch (action.type) {
    case 'error/SET':
      return action.payload;

    default:
      return error;
  }
};

export default errorReducer;
