import { Diagnosis, Entry, Patient } from "../../../types";
import { assertNever } from "../../../utils";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalForm from "./OccupationalForm";

interface entryFormProps {
    type: Entry['type'],
    toggle: () => void,
    diagnoses: Diagnosis[],
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>,
    patient: Patient
}

const EntrySwitch = ({ type, toggle, diagnoses, patient, setPatient }: entryFormProps) => {
    switch (type) {
        case "HealthCheck":
            return <HealthCheckForm patient={patient} setPatient={setPatient} toggle={toggle}/>;
        case "Hospital":
            return <HospitalForm patient={patient} setPatient={setPatient} diagnoses={diagnoses} toggle={toggle}/>;
        case "OccupationalHealthcare":
            return <OccupationalForm patient={patient} setPatient={setPatient} diagnoses={diagnoses} toggle={toggle}/>;
        default:
            return assertNever(type);
    }
};

export default EntrySwitch;