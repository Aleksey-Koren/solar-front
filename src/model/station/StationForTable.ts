
export class StationForTable {
    id: number | null = null;
    title: string | null = null;
    type: string | null = null;
    planet: string | null = null;
    // planet: PlanetForTable | null = null;
    user: string| null = null;
    // user: UserForTable| null = null;
    money: number | null = null;
    population: number | null = null;
}

interface UserForTable {
    id: number;
    title: string
}

interface PlanetForTable {
    id: number;
    title: string
}