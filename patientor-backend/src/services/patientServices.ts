import { Entry, EntryWithoutId, NewPatient, Patient, SafePatientData } from "../types";
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

const findById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addEntry = (patientId:string ,entry: EntryWithoutId): Entry => {
    const id = uuid();
    const newEntry = { ...entry, id };
    const entries = patients.find(patient => patient.id === patientId)?.entries;
    if(entries) {
        entries.push(newEntry);
        return newEntry;
    }
    throw new Error('Patient does not exist');
};


export default { getAll, addPatient, findById, addEntry };