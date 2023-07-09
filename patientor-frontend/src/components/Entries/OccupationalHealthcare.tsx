import { ArrowRightAlt, DateRange, Work } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";

interface opccupationalHealthcareProps {
    entry: OccupationalHealthcareEntry,
    diagnoses: Diagnosis[]
}

const OccupationalHealthcare = ({ entry, diagnoses }: opccupationalHealthcareProps) => {
    return (
        <Box sx={{ borderRadius: 3, border: 2, padding: 2, mb: 2.5 }}>
            <Box sx={{display: 'flex', gap:2}}>
                <Typography>{entry.date}:</Typography>
                <Work />
                <Typography>{entry.employerName}</Typography>
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
            {
                entry.sickLeave ? 
                <>
                <Typography sx={{fontWeight: 'bold'}} >Sick Leave:</Typography>
                <Box sx={{display: 'flex', mb: 2}} >
                <DateRange />
                <Typography>{entry.sickLeave.startDate}</Typography>
                <ArrowRightAlt /> 
                <Typography>{entry.sickLeave.endDate}</Typography>
                </Box>
                </>
                : null
            }
            
            <Typography>Diagnosis by: {entry.specialist}</Typography>
        </Box>
    );
};

export default OccupationalHealthcare;