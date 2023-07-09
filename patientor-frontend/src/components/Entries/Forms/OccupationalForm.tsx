import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, Entry, Patient } from "../../../types";
import patientService from "../../../services/patients";
import { notify, useDispatchNotif } from "../../../context/NotifContext";

interface occupationalProps {
    toggle: () => void,
    diagnoses: Diagnosis[],
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>,
    patient: Patient
}

const OccupationalForm = ({ toggle, diagnoses, patient, setPatient }: occupationalProps) => {
    const [codes, setCodes] = useState<Array<Diagnosis['code']>>([]);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeave, setSickLeave] = useState({ startDate: '', endDate: '' });
    const dispatchNotif = useDispatchNotif();

    async function handleCreate(e: SyntheticEvent) {
        e.preventDefault();
        try {
            const id = patient.id;
            const temp = {
                description,
                date,
                specialist,
                employerName,
                diagnosisCodes: codes,

            };
            let entry: Entry;
            if(sickLeave.startDate && sickLeave.endDate) {
                entry = await patientService.addEntry(id, {
                    ...temp,
                    type: "OccupationalHealthcare",
                    sickLeave
                });
            } else {
                entry = await patientService.addEntry(id, {
                    ...temp,
                    type: "OccupationalHealthcare",
                });
            }
            setPatient({
                ...patient,
                entries: patient.entries.concat(entry)
            });
            setDescription('');
            setDate('');
            setSpecialist('');
            setCodes([]);
            setEmployerName('');
            setSickLeave({ startDate: '', endDate: '' });
            toggle();
            dispatchNotif(notify({
                message: "added entry",
                class: "success"
            }));
        } catch(err: unknown) {
            if(err instanceof Error) {
                console.log(err);
                dispatchNotif(notify({
                    message: err.message,
                    class: "error"
                }));
            }
        }
    }

    return (
        <form onSubmit={handleCreate} style={{marginBottom: 10, borderWidth: 2, borderStyle: 'dashed', padding: 30}}>
            <Typography sx={{mb: 5}} variant="h4">New Occupational Healthcare Entry</Typography>
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
                    <Typography sx={{ fontWeight: 'bold' }}>
                        Date:
                    </Typography>
                </label>
                <input
                    id="entry-date"
                    type="date"
                    required
                    style={{ maxWidth: '30%', minWidth: 250 }}
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

                <TextField 
                variant="filled"
                size="small" 
                label="Employer Name"
                required
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                />

                <FormControl sx={{ maxWidth: '30%'}}>
                    <InputLabel id="codes">Diagnosis Codes</InputLabel>
                    <Select 
                        labelId="codes"
                        label="Diagnosis Codes"
                        value={codes}
                        multiple
                        input={<OutlinedInput label="Diagnosis Codes" />}
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
                <Typography sx={{fontWeight: 'bold'}}>Sick Leave: </Typography>
                <Stack spacing={2} sx={{padding: 1}} >
                    <label htmlFor="start-date">
                        <Typography sx={{fontWeight: 'bold'}}>
                        Start Date:
                        </Typography>
                    </label>
                    <input 
                    id="start-date"
                    type="date"
                    style={{maxWidth: '30%', minWidth: 250}}
                    value={sickLeave.startDate}
                    onChange={(e) => setSickLeave({
                        ...sickLeave,
                        startDate: e.target.value
                    })}
                    />
                    <label htmlFor="end-date">
                        <Typography sx={{fontWeight: 'bold'}}>
                        End Date:
                        </Typography>
                    </label>
                    <input 
                    id="end-date"
                    type="date"
                    style={{maxWidth: '30%', minWidth: 250}}
                    value={sickLeave.endDate}
                    onChange={(e) => setSickLeave({
                        ...sickLeave,
                        endDate: e.target.value
                    })}
                    />
                </Stack>
            </Stack>
            <Button onClick={toggle} variant="outlined" color="secondary">Cancel</Button>
            <Button  type="submit" variant="contained" color="primary" sx={{float: 'right'}} >Add</Button>
        </form>
    );
};

export default OccupationalForm;