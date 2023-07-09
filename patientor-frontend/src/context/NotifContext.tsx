import { createContext, useContext, useReducer } from 'react';


interface notifyType {
    type: "NOTIFY",
    payload: {
        message: string,
        class: "error" | "success"
    } 
}

interface clearType { type: "CLEAR" }

type ACTION_TYPE = notifyType | clearType;


const notifReducer = (state: notifyType['payload'] | null, action: ACTION_TYPE) => {
  switch(action.type) {
  case 'NOTIFY':
    return action.payload;
  case 'CLEAR':
    return null;
  default:
    return state;
  }
};

export const notify = (payload: notifyType['payload']):notifyType => {
  return {
    type: 'NOTIFY',
    payload
  };
};

export const clearNotif = (): clearType => {
  return { type: 'CLEAR' };
};


type NotifContextType = [
    notifyType['payload'] | null,
    React.Dispatch<ACTION_TYPE>
] | null;

const NotifContext = createContext<NotifContextType>(null);

export const NotifContextProvider = ({ children }: { children: JSX.Element }) => {
  const [notification, notifDispatch] = useReducer(notifReducer, null);

  return (
    <NotifContext.Provider value={[notification, notifDispatch]}>
      {children}
    </NotifContext.Provider>
  );
};


export const useDispatchNotif = () => {
  const dispatch = useContext(NotifContext);
  
  if(!dispatch) {
    throw new Error("Context must be provided for Notification");
  }
  
  return dispatch[1];
};

export default NotifContext;