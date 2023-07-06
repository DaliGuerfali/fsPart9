
export interface data {
    height: number,
    weight: number
}

const parseCli = (): data => {
    const args: string[] = process.argv;
    if(args.length < 4) throw new Error('Arguments missing!');
    if(args.length > 4) throw new Error('Too many arguments!');

    return validateData(args[2], args[3]);
};

export const validateData = (height: string, weight: string): data => {
    if(!isNaN(Number(height)) && !isNaN(Number(weight))) {
        return {
            height: Number(height),
            weight: Number(weight)
        };
    } else {
        throw new Error('Arguments invalid!');
    }
};

export const calculateBmi = (person: data):string => {
    const { height, weight } = person;
    const bmi:number = weight/(height*height/10000);
    if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight (unhealthy weight)';
    } else {
        return 'Obese (very unhealthy weight)';
    }
};
if(process.argv[1].includes("bmiCalculator.ts")) {
    try {
        console.log(calculateBmi(parseCli()));
    } catch(err: unknown) {
        if(err instanceof Error) {
            console.log(err.message);
        }
    }
}
