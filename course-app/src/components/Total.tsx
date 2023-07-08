import { CourseParts } from "../types";

interface totalProps {
    courseParts: CourseParts
}

const Total = ({ courseParts }: totalProps) => {
    return (
    <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
    );
};

export default Total;