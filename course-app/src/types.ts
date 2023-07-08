interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CourseDescription extends CoursePartBase {
    description: string
}

interface CoursePartBasic extends CourseDescription {
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CourseDescription {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartRequirements extends CourseDescription {
    requirements: string[],
    kind: "requirements"
}


export type CoursePart = CoursePartBasic | CoursePartGroup
 | CoursePartBackground | CoursePartRequirements;

export type CourseParts = CoursePart[];