import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Typography } from "@mui/material";
import { Female, Male } from "@mui/icons-material";
import { Box } from "@mui/system";
import EntryDetails from "./Entries/EntryDetails";
import EntryForm from "./Entries/Forms/EntryForm";
import Notification from "./Notification";

const PatientInfo = () => {
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    const id = useMatch('/patients/:id')?.params.id;

    

    
    useEffect(() => {
        void axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
        .then(res => setPatient(res.data))
        .catch((err: unknown) => {
            if(err instanceof AxiosError) {
                console.log(err.response?.data);
            }
        });

        void axios.get(`${apiBaseUrl}/diagnoses`)
        .then(res => setDiagnoses(res.data))
        .catch((err: unknown) => {
            if(err instanceof AxiosError) {
                console.log(err.response?.data);
            }
        });

    }, [id]);

    

    
    const gender = patient?.gender === 'other' ? 
    null : 
    patient?.gender === 'male' ?
    <Male /> : <Female />;
    
    if(!patient || !diagnoses) return null;

    return (
        <>
        <Box sx={{display: 'flex', alignItems: 'baseline', gap: 5}}>
            <Typography variant="h4" sx={{mt: 2.5, mb: 2.5}} >
                {patient.name}
            </Typography>
            {gender}
        </Box>
        <Typography  >
            ssn: {patient.ssn}
        </Typography>
        <Typography sx={{mb: 2.5}} >
            occupation: {patient.occupation}
        </Typography>
        <Notification />
        <EntryForm patient={patient} diagnoses={diagnoses} setPatient={setPatient} />
        <Typography variant="h5" sx={{mb: 2.5}} >Entries:</Typography>
        {
            
            patient.entries.map(entry => {
                return (
                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
                )
            })
            
        }
        </>
    );
};

export default PatientInfo;