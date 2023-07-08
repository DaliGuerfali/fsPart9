import { EntryType } from "../types";
import Entry from "./Entry";

interface entriesProps {
    entries: EntryType[]
}

const Entries = ({ entries }: entriesProps) => {
    return (
    <>
        <h2>Diary entries</h2>
        {
            entries.map(entry => <Entry key={entry.id} entry={entry}/>)
        }
    </>
    );
};

export default Entries;