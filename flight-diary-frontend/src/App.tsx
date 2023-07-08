import axios from 'axios';
import { useEffect, useState } from 'react';
import DiaryForm from './components/DiaryForm';
import Entries from './components/Entries';
import { EntryType } from './types';

function App() {
  const [entries, setEntries] = useState<EntryType[]>([]);

 
  useEffect(() => {
    axios.get<EntryType[]>('/api/diaries')
    .then(res => setEntries(res.data));
  },[]);

  return (
    <>
    <h1>Flight Diaries</h1>
    
    <DiaryForm  entries={entries} setEntries={setEntries} />
    <Entries entries={entries}/>

    </>
  );
}

export default App;
