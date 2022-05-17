import {StationDto} from "./StationDto";
import {StationForTable} from "./StationForTable";
import {findPlanetById} from "../../service/planetService";
import {Planet} from "../planet/Planet";
import {findUserById} from "../../service/userService";
import {findOTDById} from "../../service/objectTypeDescriptionService";


export async function mapStationDtoToStationForTable (dto: StationDto) {
    const stationForTable = new StationForTable();
    stationForTable.id = dto.id;
    stationForTable.money = dto.money;
    stationForTable.population = dto.population;
    stationForTable.title = dto.title;

    let planetResp;
    let OTDResp;
    let userResp;
    try {
        if (dto.userId !== null) {
            planetResp = await findPlanetById(dto.planet);
            OTDResp = await findOTDById(dto.hullId);
            userResp = await findUserById(dto.userId);
            stationForTable.user = userResp.data.title;
        } else {
            planetResp = await findPlanetById(dto.planet);
            OTDResp = await findOTDById(dto.hullId);
        }
    } catch (e: any) {
        throw new Error(e);
    }

    stationForTable.planet = await generatePlanetTitle(planetResp.data);
    stationForTable.type = OTDResp.data.title;
    return stationForTable;
}

async function generatePlanetTitle(planet: Planet) {

    let parentPlanet = await findPlanetById(planet.parent)
    if (parentPlanet.data.title !== "Sun") {
        return `${planet.title} (${parentPlanet.data.title})`;
    } else {
        return planet.title;
    }
}