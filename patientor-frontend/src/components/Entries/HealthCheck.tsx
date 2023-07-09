import { Favorite, MedicalServices } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { HealthCheckEntry } from "../../types";


interface healthCheckProps {
    entry: HealthCheckEntry
}

const HealthCheck = ({ entry }: healthCheckProps) => {
    let color: string;

    switch(entry.healthCheckRating) {
        case 0:
            color = 'green';
            break;
        case 1:
            color = 'yellow';
            break;
        case 2:
            color = 'orange';
            break;
        case 3:
            color = 'red';
            break;
        default:
            return null;
    }
    return (
        <Box sx={{ borderRadius: 3, border: 2, padding: 2, mb: 2.5 }}>
            <Box sx={{display: 'flex', gap:2}}>
                <Typography>{entry.date}:</Typography>
                <MedicalServices />
            </Box>
            <Typography>{entry.description}</Typography>
            
            <Favorite fontSize="large" sx={{color}} />
            
            <Typography>Diagnosis by: {entry.specialist}</Typography>
        </Box>
    );
};

export default HealthCheck;