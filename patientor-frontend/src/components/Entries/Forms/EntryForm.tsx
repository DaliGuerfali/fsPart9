import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import EntrySwitch from "./EntrySwitch";
import { useState } from "react";
import { Diagnosis, Entry, Patient } from "../../../types";

const defaultForm: Entry['type'] = "Hospital"; 


interface entryFormProps {
    diagnoses: Diagnosis[],
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>,
    patient: Patient
}

const EntryForm = ({ diagnoses, setPatient, patient }: entryFormProps) => {

    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<Entry['type']>(defaultForm);
    const sxVisibility = visible ? { display: '' } : { display: 'none' };

    const toggleFormVisibility = () => {
        setVisible(!visible);
    };

    return (
        <>
            <Box sx={sxVisibility}>
                <EntrySwitch patient={patient} setPatient={setPatient} diagnoses={diagnoses} type={type} toggle={toggleFormVisibility} />
            </Box>
            <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
            <Button  
            onClick={toggleFormVisibility} 
            sx={{mb: 2}}variant="contained" 
            disabled={visible}>Add Entry</Button>
            <FormControl sx={sxVisibility}>
                <FormLabel id="type-radio" >Entry Type:</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="type-radio"
                    defaultValue={defaultForm}
                    name="type-group"
                    onChange={(e) => setType(e.target.value as Entry['type'])}
                    >
                    <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
                    <FormControlLabel value="HealthCheck" control={<Radio />} label="Healthcheck" />
                    <FormControlLabel value="OccupationalHealthcare" control={<Radio />} label="Occupational" />
                </RadioGroup>
            </FormControl>
            </Box>
        </>
    );
};

export default EntryForm;