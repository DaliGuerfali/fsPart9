import { EntryType} from "../types";

interface entryProps {
    entry: EntryType
}

const Entry = ({ entry }: entryProps) => {
    return (
    <>
        <h3>{entry.date}</h3>
        <p>weather: {entry.weather}</p>
        <p>visibility: {entry.visibility}</p>
    </>
    );    
};

export default Entry;