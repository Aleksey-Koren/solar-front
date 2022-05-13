import {ObjectType} from "./ObjectType";
import {ObjectSubType} from "./ObjectSubType";

export class OTDDto {

    id: number | null = null;
    inventoryType: number | null = null;
    title: string | null = null;
    powerMin: number | null = null;
    powerMax: number | null = null;
    powerDegradation: number | null = null;
    distance: number | null = null;
    cooldown: number | null = null;
    energyConsumption: number | null = null;
    durability: number | null = null;
    mass: number | null = null;
    description: string | null = null;
    price: number | null = null;
    volume: number | null = null;
    type: ObjectType | null = null;
    subType: ObjectSubType | null = null;
}