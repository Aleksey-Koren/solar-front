import {Product} from "../../product/Product";
import {StationForTable} from "../StationForTable";
import {DropdownOption} from "../../planet/DropdownOption";


export class Production {

    id: number | null = null;
    product: DropdownOption | null = null;
    power: number | null = null;
    station: DropdownOption | null = null;
}