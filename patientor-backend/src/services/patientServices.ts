import { NewPatient, Patient, SafePatientData } from "../types";
import patients from "../data/patients";
import { v1 as uuid } from 'uuid';

const getAll = (): SafePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return { id, name, dateOfBirth, gender, occupation };
    });
};

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid();
    const newPatient = {...patient, id };
    patients.push(newPatient);
    return  newPatient;
};


export default { getAll, addPatient };