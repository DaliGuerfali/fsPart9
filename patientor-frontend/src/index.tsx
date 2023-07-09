import ReactDOM from 'react-dom/client'

import App from './App'
import { NotifContextProvider } from './context/NotifContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <NotifContextProvider>
        <App />
    </NotifContextProvider>
);