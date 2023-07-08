import Notification from '../components/Notification';
import { EntryType, NotifType } from '../types';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface diaryFormProps {
    entries: EntryType[],
    setEntries: React.Dispatch<React.SetStateAction<EntryType[]>>
}

const DiaryForm = ({ entries, setEntries }: diaryFormProps) => {
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState('');
    const [visibility, setVisibility] = useState('');
    const [comment, setComment] = useState('');
    const [notification, setNotification] = useState<NotifType>(null);


    function handleCreate(e: React.SyntheticEvent) {
        e.preventDefault();
    
        axios.post<EntryType>('/api/diaries', {
          date,
          weather,
          visibility,
          comment
        }).then(res => {
          const newEntry = res.data;
          setEntries(entries.concat(newEntry));
          setNotification({
            message: `Success: added ${newEntry.date} diary`,
            class: 'success'
          });
        })
        .catch((err: unknown) => {
          if(err instanceof AxiosError && err.response) {
            console.log(err.response.status);
            setNotification({
              message: err.response.data,
              class: 'error'
            });
          } else if(err instanceof Error) {
            console.log(err.message);
          }
        })
        .finally(() => {
          setComment('');
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
      }

    const changeWeather = (e: React.ChangeEvent<HTMLInputElement>) => 
    setWeather(e.target.value);

    const changeVisibility = (e: React.ChangeEvent<HTMLInputElement>) => 
    setVisibility(e.target.value);

    return (
    <>
    <Notification notif={notification}/>
    <h2>Add new</h2>
    <form onSubmit={handleCreate}>
      <div>
        date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        weather:
        
        <label htmlFor="sunny" > sunny</label>
        <input type="radio" id="sunny" name="weather" value="sunny" 
        onChange={changeWeather} />

        <label htmlFor="rainy" >rainy</label>
        <input type="radio" id="rainy" name="weather" value="rainy" 
        onChange={changeWeather} />

        <label htmlFor="cloudy" >cloudy</label>
        <input type="radio" id="cloudy" name="weather" value="cloudy" 
        onChange={changeWeather} />

        <label htmlFor="stormy" >stormy</label>
        <input type="radio" id="stormy" name="weather" value="stormy" 
        onChange={changeWeather} />

        <label htmlFor="windy" >windy</label>
        <input type="radio" id="windy" name="weather" value="windy" 
        onChange={changeWeather} />

      </div>
      <div>
        visibility: 
        <label htmlFor="great" > great</label>
        <input type="radio" id="great" name="visibility" value="great" 
        onChange={changeVisibility} />

        <label htmlFor="good" >good</label>
        <input type="radio" id="good" name="visibility" value="good" 
        onChange={changeVisibility} />

        <label htmlFor="ok" >ok</label>
        <input type="radio" id="ok" name="visibility" value="ok" 
        onChange={changeVisibility} />

        <label htmlFor="poor" >poor</label>
        <input type="radio" id="poor" name="visibility" value="poor" 
        onChange={changeVisibility} />
      </div>
      <div>
        comment: <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
      <button type="submit">add</button>
    </form>
    </>
    );
};

export default DiaryForm;