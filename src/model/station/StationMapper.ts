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


    // if(dto.userId !== null) {
    //    return  await retrieveDataWithUser(stationForTable, dto);
    // } else {
    //     await retriveDataWithoutUser(stationForTable, dto);
    // }
    // return dto.userId !== null ? retrieveDataWithUser(stationForTable, dto) : retriveDataWithoutUser(stationForTable, dto);
}

// async function retriveDataWithoutUser(stationForTable: StationForTable, dto: StationDto) {
//     try {
//         let result = stationForTable;
//         let planetResp = await findPlanetById(dto.planet);
//         let OTDResp = await findOTDById(dto.hullId);
//         return {
//             ...result,
//             planet: generatePlanetTitle(planetResp.data),
//             type: OTDResp.data.title
//         }
//     }catch (e: any) {
//         throw new Error(e);
//     }

    // Promise.all([
    //     findPlanetById(dto.planet),
    //     findOTDById(dto.hullId),
    // ]).then(([planetResp, OTDResp]) => {
    //    result.planet = generatePlanetTitle(planetResp.data);
    //    result.type = OTDResp.data.title;
    //    return result;
    // }).catch(() => {
    //     console.log('retriveDataWithoutUser CATCH');
    //    return result;
    // })

// }
//
// function retrieveDataWithUser(stationForTable: StationForTable, dto: StationDto) {
//     let result = stationForTable;
//     Promise.all([
//         findPlanetById(dto.planet),
//         findUserById(dto.userId),
//         findOTDById(dto.hullId),
//     ]).then(([planetResp, userResp, OTDResp]) => {
//         result.planet = generatePlanetTitle(planetResp.data);
//         result.user = userResp.data.title;
//         result.type = OTDResp.data.title;
//     }).catch(() => {
//         console.log('retrieveDataWithUser CATCH')
//     })
//     return result;
// }

async function generatePlanetTitle(planet: Planet) {

    let parentPlanet = await findPlanetById(planet.parent)
    if (parentPlanet.data.title != "Sun") {
        return `${planet.title} (${parentPlanet.data.title})`;
    } else {
        return planet.title;
    }
}