import express from 'express';
import patientServices from '../services/patientServices';
import { toNewPatient } from '../utils';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.json(patientServices.getAll());
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

export default patientsRouter;


