import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import { Diagnosis, Patient } from "../../../types";
import { SyntheticEvent, useState } from "react";
import patientService from "../../../services/patients";
import { notify, useDispatchNotif } from "../../../context/NotifContext";

interface hospitalFormProps {
    toggle: () => void,
    diagnoses: Diagnosis[],
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>,
    patient: Patient
}

const HospitalForm = ({ toggle, diagnoses, patient, setPatient }: hospitalFormProps) => {
    const [codes, setCodes] = useState<Array<Diagnosis['code']>>([]);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [discharge, setDischarge] = useState({ date: '', criteria: '' });

    const dispatchNotif = useDispatchNotif();


    async function handleCreate(e: SyntheticEvent) {
        e.preventDefault();
        try {
            const id = patient.id;
            const entry = await patientService.addEntry(id, {
                type: "Hospital",
                description,
                date,
                specialist,
                discharge,
                diagnosisCodes: codes
            });
            setPatient({
                ...patient,
                entries: patient.entries.concat(entry)
            });
            setCodes([]);
            setDescription('');
            setDate('');
            setSpecialist('');
            setDischarge({ date: '', criteria: '' });
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
            <Typography sx={{mb: 5}} variant="h4">New Hospital Entry</Typography>
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

                <FormControl sx={{maxWidth: '30%'}}>
                    <InputLabel id="codes">Diagnosis Codes</InputLabel>
                    <Select
                        labelId="codes"
                        label="Diagnosis Codes"
                        value={codes}
                        multiple
                        input={<OutlinedInput  label="Diagnosis Codes" />}
                        onChange={(e) => 
                            setCodes(typeof e.target.value === 'string' ? 
                            e.target.value.split(',') : e.target.value)}
                    >
                        {
                            diagnoses.map(diagnosis => 
                                <MenuItem key={diagnosis.code} value={diagnosis.code}>{diagnosis.code}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Typography sx={{fontWeight: 'bold'}}>Discharge: </Typography>
                <Stack spacing={2} sx={{padding: 1}} >
                    <label htmlFor="discharge-date">
                        <Typography sx={{fontWeight: 'bold'}}>
                        Date:
                        </Typography>
                    </label>
                    <input 
                    id="discharge-date"
                    type="date"
                    required
                    style={{maxWidth: '30%', minWidth: 250}}
                    value={discharge.date}
                    onChange={(e) => setDischarge({
                        ...discharge,
                        date: e.target.value
                    })}
                    />
                    <TextField
                    variant="filled"
                    size="small" 
                    label="Criteria"
                    required
                    value={discharge.criteria}
                    onChange={(e) => setDischarge({
                        ...discharge,
                        criteria: e.target.value
                    })}
                    />
                </Stack>
            </Stack>
            <Button onClick={toggle} variant="outlined" color="secondary">Cancel</Button>
            <Button  type="submit" variant="contained" color="primary" sx={{float: 'right'}} >Add</Button>
        </form>
    );
};

export default HospitalForm;