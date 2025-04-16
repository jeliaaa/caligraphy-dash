export type Supervisor = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
};

type Service = {
    id: number;
    name: string;
};

type Person = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    email_verified?: boolean | null;
};

export type Renovation = {
    id: number;
    track: string;
    service: Service;
    supervisor: Person;
    customer: Person;
    address: string;
    start_date: string; // ISO date string (e.g., "2025-04-16")
    end_date: string;   // ISO date string
    progress: number;
};

export type Stage = {
    id: number;
    images: string[];
    name: string;
    is_completed: Date;
}