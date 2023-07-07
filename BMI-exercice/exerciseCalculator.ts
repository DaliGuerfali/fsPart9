interface exerciseData { 
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number, 
    success: boolean,
    rating: number,
    ratingDescription: string,
}

interface exerciseRequest {
    daily_exercises: number[],
    target: number
}

const parseExerciseCli = (): exerciseRequest => {
    const args: string[] = process.argv;
    if(args.length < 4) throw new Error('Arguments missing!');

    return validateExercises({
        daily_exercises: args.slice(3).map(arg => Number(arg)),
        target: Number(args[2])
    });
};


export const validateExercises = (request: exerciseRequest): exerciseRequest => {
    const { daily_exercises, target} = request;

    if(!target || !daily_exercises) {
        throw new Error('Arguments missing!');
    } else if(daily_exercises.every(day => !isNaN(day) && !(typeof day === 'string')) && !isNaN(target) && !(typeof target === 'string')) {
        return {
            daily_exercises,
            target
        };
    } else {
        throw new Error('Arguments invalid!');
    }
};

export const calculateExercises = (data: exerciseRequest): exerciseData => {
    const { daily_exercises, target } = data;
    const periodLength = daily_exercises.length;
    const average = daily_exercises.reduce((a, b) => a + b, 0)/periodLength;
    const success = average >= target;
    const rating = success ? 3 : parseFloat(((average/target)*2 + 1).toFixed(2));
    let ratingDescription: string;
    if (success) {
        ratingDescription = 'Good Job! You reached your goal!';
    } else if (rating >= 2.8) {
        ratingDescription = 'Keep going! You\'re almost there!';
    } else if (rating >= 1.5) {
        ratingDescription = 'Not enough! You need to exercice more!';
    } else {
        ratingDescription = 'Seriously?! You\'ve barely scratched the surface!';
    }

    return {
        periodLength,
        trainingDays: daily_exercises.filter(day => day !== 0).length,
        target,
        average,
        success,
        rating,
        ratingDescription
    };
};
if(process.argv[1].includes("exerciseCalculator.ts")) {
    try {
        console.log(calculateExercises(parseExerciseCli()));
    } catch(err: unknown) {
        if(err instanceof Error) {
            console.log(err.message);
        }
    }
}
