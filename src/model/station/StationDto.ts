import {BasicObjectView} from "../object/BasicObjectView";
import {ProductionDto} from "./production/ProductionDto";

export class StationDto extends BasicObjectView {

    userId: number | null = null;
    money: number | null = null;

    production: ProductionDto[];
}