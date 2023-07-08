export const assertNever = (object: never):never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(object)}`);
};