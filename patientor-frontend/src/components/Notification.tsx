import { useContext } from 'react';
import NotifContext, { clearNotif } from '../context/NotifContext';
import { Alert } from '@mui/material';

const Notification = () => {
  const context =  useContext(NotifContext); 
  if(!context) {
    throw new Error("Context must be provided for Notification");
  }
  const [notification, dispatchNotif] = context;

  if (notification) {
    setTimeout(() => {
      dispatchNotif(clearNotif());
    }, 5000);
    return <Alert sx={{ mb: 5 }} severity={notification.class}>{notification.message}</Alert>;
  } else {
    return null;
  }
};

export default Notification;