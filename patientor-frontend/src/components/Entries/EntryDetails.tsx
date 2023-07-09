import { Diagnosis, Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

interface entryDetailsProps {
    entry: Entry,
    diagnoses: Diagnosis[]
}

const EntryDetails = ({ entry, diagnoses }: entryDetailsProps) => {
    switch(entry.type) {
        case "HealthCheck":
            return <HealthCheck entry={entry}/>;
        case "Hospital":
            return <Hospital entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;


