import { CourseParts } from "../types"
import Part from "./Part";

interface contentProps {
    courseParts: CourseParts
}

const Content = ({ courseParts }:contentProps) => {
    return (
    <>
        <h2>Courses: </h2>
        <ul>
            {courseParts.map((part) => <Part key={part.name} part={part} />)}
        </ul>
    </>
    );
};

export default Content;