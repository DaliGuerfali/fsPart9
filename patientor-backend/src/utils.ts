import { Gender, NewPatient } from "./types";



export const toNewPatient = (patient: unknown): NewPatient => {
    if(!patient || !(typeof patient === 'object')) throw new Error("Incorrect or missing data");
    
    if('name' in patient && 'dateOfBirth' in patient && 'gender' in patient && 'occupation' in patient
     && 'ssn' in patient) {
        const { name, dateOfBirth, gender, occupation, ssn } = patient;
        
        return { 
            name: parseString(name),
            dateOfBirth: parseDate(dateOfBirth),
            gender: parseGender(gender),
            occupation: parseString(occupation),
            ssn: parseSSN(ssn)
        };
    }
    throw new Error("Incorrect data: some fields are missing");
};


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isSSN = (ssn: string): boolean => {
    return (/^\d{6}-\d{3}\w$/).test(ssn);
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseString = (text: unknown): string => {
    if(!isString(text)) throw new Error("Data must be of type string");
    
    return text;
};

const parseSSN = (ssn: unknown):string => {
    if(!isString(ssn) || !isSSN(ssn)) throw new Error("SSN must be valid");
    return ssn;
};

const parseDate = (date: unknown): string => {
    if(!isString(date) || !isDate(date)) throw new Error("Date must be valid");
    
    return date;
};

const parseGender = (gender: unknown):Gender => {
    if(!isString(gender) || !isGender(gender)) throw new Error("Gender must be valid");
    
    return gender;
};

