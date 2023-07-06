import express from 'express';
import { calculateBmi, validateData } from './bmiCalculator';
import { calculateExercises, validateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
});

interface bmiData {
    height: string,
    weight: string
}

app.get('/bmi', (req, res) => {
    const result = req.query as unknown as bmiData;
    try{
        const { height, weight } = validateData(result.height, result.weight);
        res.json({ height, weight, bmi: calculateBmi({ height, weight })});
    } catch(err: unknown) {
        if(err instanceof Error) {
            console.log(err);
            res.status(400).json({ error: 'malformatted query' });
        }
    }
});

app.post('/exercises', (req, res) => {
    const body = req.body;
    try {
        res.json(calculateExercises(validateExercises(body)));
    }catch(err: unknown) {
        if(err instanceof Error) {
            console.log(err.message);
            if(err.message.includes('missing')) {
                res.status(400).json({ error: 'parameters missing' });
            } else {
                res.status(400).json({ error: 'malformatted query' });
            }
        }
    }
});

const PORT: number = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
