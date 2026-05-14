export interface Evento {
    id: string;
    name: string;
    dates: { start: { localDate: string; localTime?: string } };
    _embedded?: { venues: Array<{ name: string; location?: { latitude: string; longitude: string } }> };
    images?: Array<{ url: string }>;
    description?: string;
    isUserCreated?: boolean;
}