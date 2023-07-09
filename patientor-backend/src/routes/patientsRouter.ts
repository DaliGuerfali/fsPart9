import express from 'express';
import patientServices from '../services/patientServices';
import { toNewEntry, toNewPatient } from '../utils';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.json(patientServices.getAll());
});


patientsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientServices.findById(id);

    if(!patient) {
        res.status(404).end();
    } else {
        res.json(patient);
    }
});


patientsRouter.post('/', (req, res) => {
    try {
        const body = toNewPatient(req.body);
        res.json(patientServices.addPatient((body)));
        
    } catch (error: unknown) {
        if(error instanceof Error) {
            console.log(`Error: ${error.message}`);
            res.status(400).json({ error: 'malformatted request' });
        }
    }
});

patientsRouter.post('/:id/entries', (req, res) => {
    try {
        const body = toNewEntry(req.body);
        res.json(patientServices.addEntry(req.params.id, body));
    }catch(err: unknown) {
        if(err instanceof Error) {
            console.log(`Error: ${err.message}`);
            res.status(400).json({ error: 'malformatted request' });
        }
    }
});

export default patientsRouter;


