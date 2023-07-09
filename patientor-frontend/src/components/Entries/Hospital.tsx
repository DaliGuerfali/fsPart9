import { LocalHospital } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";

interface hospitalProps {
    entry: HospitalEntry,
    diagnoses: Diagnosis[]
}

const Hospital = ({ entry, diagnoses }: hospitalProps) => {
    return (
        <Box sx={{ borderRadius: 3, border: 2, padding: 2, mb: 2.5 }}>
            <Box sx={{display: 'flex', gap:2}}>
                <Typography>{entry.date}:</Typography>
                <LocalHospital />
            </Box>
            <Typography>{entry.description}</Typography>
            <ul>
                {
                    entry.diagnosisCodes?.map(code => {
                        return (
                            <li key={code}>{code} {
                                diagnoses.find(diagnosis => diagnosis.code === code)?.name
                            }</li>
                        )
                    } 
                    )
                }
            </ul>
            <Typography sx={{fontWeight: 'bold'}} >Discharge:</Typography>
            <ul>
                <li>{entry.discharge.date}</li>
                <li>Criteria: {entry.discharge.criteria}</li>
            </ul>
            <Typography>Diagnosis by: {entry.specialist}</Typography>
        </Box>
    );
};

export default Hospital;