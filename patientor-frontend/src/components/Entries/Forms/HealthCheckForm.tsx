import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { HealthCheckRating, Patient } from "../../../types";
import { SyntheticEvent, useState } from "react";
import patientService from "../../../services/patients";
import { notify, useDispatchNotif } from "../../../context/NotifContext";

const defaultRating = 0;

interface healthCheckFormProps {
    toggle: () => void,
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>,
    patient: Patient
}

const HealthCheckForm = ({ toggle, patient, setPatient }: healthCheckFormProps) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [rating, setRating] = useState(defaultRating);

    const dispatchNotif = useDispatchNotif();


    async function handleCreate(e: SyntheticEvent) {
        e.preventDefault();
        try {
            const id = patient.id;
            const entry = await patientService.addEntry(id, {
                type: "HealthCheck",
                description,
                date,
                specialist,
                healthCheckRating: rating
            });
            setPatient({
                ...patient,
                entries: patient.entries.concat(entry)
            });
            setDescription('');
            setDate('');
            setSpecialist('');
            toggle();
            dispatchNotif(notify({
                message: "added entry",
                class: "success"
            }));
        } catch(err: unknown) {
            if(err instanceof Error) {
                console.log(err.message);
                dispatchNotif(notify({
                    message: err.message,
                    class: "error"
                }));
            }
        }

    }

    return (
        <form onSubmit={handleCreate} style={{marginBottom: 10, borderWidth: 2, borderStyle: 'dashed', padding: 30}}>
            <Typography sx={{mb: 5}} variant="h4">New Healthcheck Entry</Typography>
            <Stack spacing={2} sx={{mb: 2}}>
                <TextField 
                variant="filled" 
                size="small" 
                label="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <label htmlFor="entry-date">
                    <Typography sx={{fontWeight: 'bold'}}>
                    Date:
                    </Typography>
                </label>
                <input 
                id="entry-date"
                type="date"
                required
                style={{maxWidth: '30%', minWidth: 250}}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />

                <TextField 
                variant="filled" 
                size="small" 
                label="Specialist"
                required
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
                />

                <FormControl>
                    <FormLabel id="rating-radio" >Healthcheck Rating:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="rating-radio"
                        defaultValue={defaultRating}
                        name="rating-group"
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        value={rating}  
                    >
                    {
                        Object.keys(HealthCheckRating)
                        .filter((key) => isNaN(Number(HealthCheckRating[key as unknown as HealthCheckRating])))
                        .map(rating => 
                            <FormControlLabel key={rating} value={rating}
                            control={<Radio />} label={HealthCheckRating[rating as unknown as HealthCheckRating]}  />)
                    }
                    </RadioGroup>
                </FormControl>
            </Stack>
            <Button onClick={toggle} variant="outlined" color="secondary">Cancel</Button>
            <Button  type="submit" variant="contained" color="primary" sx={{float: 'right'}} >Add</Button>
        </form>
    );
};

export default HealthCheckForm;