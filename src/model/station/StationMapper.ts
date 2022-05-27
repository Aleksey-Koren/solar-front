import {StationDto} from "./StationDto";
import {StationForTable} from "./StationForTable";
import {findPlanetById} from "../../service/planetService";
import {Planet} from "../planet/Planet";
import {findUserById} from "../../service/userService";
import {findOTDById} from "../../service/objectTypeDescriptionService";
import {DropdownOption} from "../planet/DropdownOption";
import {Station} from "./Station";
import {Production} from "./production/Production";
import {ProductionDto} from "./production/ProductionDto";
import {Builder} from "builder-pattern";
import {fetchProductsDropdown} from "../../service/productService";


export async function mapStationDtoToStationForTable (dto: StationDto) {

    const stationForTable = new Station();

    stationForTable.id = dto.id;
    stationForTable.money = dto.money;
    stationForTable.population = dto.population;
    stationForTable.title = dto.title;
    stationForTable.fraction = dto.fraction;

    let planetResp;
    let OTDResp;
    let userResp;
    try {
        if (dto.userId !== null) {
            planetResp = await findPlanetById(dto.planet);
            OTDResp = await findOTDById(dto.hullId);
            userResp = await findUserById(dto.userId);
            stationForTable.user = new DropdownOption(userResp.data.id, userResp.data.title);
        } else {
            planetResp = await findPlanetById(dto.planet);
            OTDResp = await findOTDById(dto.hullId);
        }
    } catch (e: any) {
        throw new Error(e);
    }

    stationForTable.planet = new DropdownOption(planetResp.data.id, await generatePlanetTitle(planetResp.data)) ;
    stationForTable.type = new DropdownOption(OTDResp.data.id, OTDResp.data.title)

    return stationForTable;
}

export async function mapStationDtoToStationForEdit(dto: StationDto) {

    let stationForEdit: Station;

    mapStationDtoToStationForTable(dto)
        .then(stationForTable => mapStationForTableToStationForEdit(stationForTable, dto))
        .then(stationFromPromise => stationForEdit = stationFromPromise);

    return stationForEdit;
}



async function mapStationForTableToStationForEdit(station: Station, dto: StationDto) {

    station.x = dto.x
    station.y = dto.y
    station.aphelion = dto.aphelion
    station.angle = dto.angle

    const products: DropdownOption[] = (await fetchProductsDropdown()).data;
    station.production = dto.production.map(dto => mapProductionDtoToEntity(dto, station, products));

    return station;
}

function mapProductionDtoToEntity(dto: ProductionDto, station: Station, products: DropdownOption[]) {

    return Builder(Production)
        .id(dto.id)
        .station(new DropdownOption(station.id, station.title))
        .product(products.find(dropdownOption => dropdownOption.value === dto.id))
        .power(dto.power)
        .build()
}

async function generatePlanetTitle(planet: Planet) {

    let parentPlanet = await findPlanetById(planet.parent)
    if (parentPlanet.data.title !== "Sun") {
        return `${planet.title} (${parentPlanet.data.title})`;
    } else {
        return planet.title;
    }
}