export interface AppProps {
    headerText: string;
    extraText?: string;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: number;
}

export interface User {
    name: string;
    age: number;
    country: string;
    address: Address;
    admin: boolean;
}