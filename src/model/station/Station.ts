import {DropdownOption} from "../planet/DropdownOption";
import {Production} from "./production/Production";

export class Station {

    id: number | null = null;
    title: string | null = null;
    type: DropdownOption | null = null;
    planet: DropdownOption | null = null;
    user: DropdownOption | null = null;
    money: number | null = null;
    fraction: string | null = null;
    population: number | null = null;
    x: number | null = null;
    y: number | null = null;
    aphelion: number | null = null;
    angle: number | null = null;

    production: Production[] | null = null;
}