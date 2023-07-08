import { NotifType } from "../types";

interface notifProps {
    notif: NotifType
}

const Notification = ({ notif }: notifProps) => {
    if(!notif) return null;

    const style = {
        color: notif.class === 'success' ? 'green' : 'red'
    };
    
    return (
        
        <h3 style={style} >{notif.message}</h3>
    );
};

export default Notification;