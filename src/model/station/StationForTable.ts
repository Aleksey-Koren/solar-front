import {DropdownOption} from "../planet/DropdownOption";

export class StationForTable {
    id: number | null = null;
    title: string | null = null;
    type: DropdownOption | null = null;
    planet: DropdownOption | null = null;
    user: DropdownOption | null = null;
    money: number | null = null;
    fraction: string | null = null;
    population: number | null = null;
}
