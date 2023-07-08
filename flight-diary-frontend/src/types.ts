export interface EntryType {
    id: number,
    date: string,
    weather: string,
    visibility: string
}

export type NotifType = {
    message: string,
    class: 'error' | 'success'
} | null;

