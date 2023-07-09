import { Diagnose, EntryWithoutId, Gender, HealthCheckRating, NewPatient } from "./types";



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
            ssn: parseSSN(ssn),
            entries: []
        };
    }
    throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (entry: unknown): EntryWithoutId => {
    if(!entry || !(typeof entry === 'object')) throw new Error("Incorrect or missing data");

    if('description' in entry && 'date' in entry && 'specialist' in entry && 'type' in entry) {
        const baseEntry = {
            date: parseDate(entry.date),
            description: parseString(entry.description),
            specialist: parseString(entry.specialist),
        };
        
        switch (entry.type) {
            case 'HealthCheck':
                if('healthCheckRating' in entry) {
                    return {
                        ...baseEntry,
                        type: "HealthCheck",
                        healthCheckRating: parseRating(entry.healthCheckRating)
                    };
                }
                break;
            case 'Hospital':
                if('discharge' in entry) {
                    const dischargeEntry = {
                        ...baseEntry,
                        discharge: parseDischarge(entry.discharge),
                    };
                    return {
                        ...dischargeEntry,
                        type: "Hospital",
                        diagnosisCodes: parseDiagnosisCodes(entry)
                    };
                }
                break;
                case 'OccupationalHealthcare':
                    if('employerName' in entry) {
                        const employerEntry = {
                            ...baseEntry,
                            employerName: parseString(entry.employerName)
                        };
                        if('sickLeave' in entry) {
                            return {
                                ...employerEntry,
                                diagnosisCodes: parseDiagnosisCodes(entry),
                                sickLeave: parseSickLeave(entry.sickLeave),
                                type: "OccupationalHealthcare"
                            };
                        }
                        return {
                            ...employerEntry,
                            diagnosisCodes: parseDiagnosisCodes(entry),
                            type: "OccupationalHealthcare"
                        };
                    }
                    break;
                }
            }
            throw new Error("Incorrect data: some fields are missing");
            
        };



const isObject = (obj: unknown): obj is object => {
    return typeof obj === 'object';
};

const isNumber = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number; 
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

const isRating = (rating: number): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

const isDischarge = (discharge: object): discharge is { date: string, criteria: string }  => {
    return 'date' in discharge && 'criteria' in discharge;
};

const isSickLeave = (sickLeave: object): sickLeave is { startDate: string, endDate: string } => {
    return 'startDate' in sickLeave && 'endDate' in sickLeave;
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

const parseRating = (rating: unknown): number => {
    if(!isNumber(rating) || !isRating(rating)) throw new Error("Rating must be valid");
    
    return rating;
};


const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<Diagnose['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnose['code']>;
};


const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
    if(!isObject(discharge) || !isDischarge(discharge)) throw new Error("Discharge must be valid");

    return {
        date: parseDate(discharge.date),
        criteria: parseString(discharge.criteria),
    };
};

const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } => {
    if(!isObject(sickLeave) || !isSickLeave(sickLeave)) throw new Error("Sick Leave must be valid");

    return {
        startDate: parseDate(sickLeave.startDate),
        endDate: parseDate(sickLeave.endDate)
    };
};