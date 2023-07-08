import { CoursePart } from "../types";
import { assertNever } from "../utils";

interface partProps {
    part: CoursePart
}

const Part = ({ part }: partProps) => {
    let info = null;
    switch(part.kind) {
        case "basic":
            info = (
                <ul>
                    <li>
                        exercises: {part.exerciseCount}
                    </li>
                    <li>
                        description: {part.description}
                    </li>
                </ul>
            );
            break;
        case "group":
            info = (
                <ul>
                    <li>
                        exercises: {part.exerciseCount}
                    </li>
                    <li>
                        group projects: {part.groupProjectCount}
                    </li>
                </ul>
            );
            break;
        case "background":
            info = (
                <ul>
                    <li>
                        exercises: {part.exerciseCount}
                    </li>
                    <li>
                        description: {part.description}
                    </li>
                    <li>
                        background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
                    </li>
                </ul>
            );
            break;
        case "requirements":
            info = (
                <ul>
                    <li>
                        exercises: {part.exerciseCount}
                    </li>
                    <li>
                        description: {part.description}
                    </li>
                    <li>
                        <h4>course prerequisites:</h4> 
                            <ul>
                                {
                                    part.requirements.map(r => <li key={r} >{r}</li>)
                                }
                            </ul>
                    </li>
                </ul>
            );
            break;
        default:
            return assertNever(part);
    }
    
    return (
        <li>
            <h3>{part.name}</h3>
            {info} 
        </li>
    );
};

export default Part;


