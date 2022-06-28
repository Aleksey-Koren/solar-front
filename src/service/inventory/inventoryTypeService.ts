import {InventoryType} from "../../model/inventory/inventoryType";
import {axiosApi} from "../../http/axios";
import {Page} from "../../model/util/Page";

export class InventoryTypeService {

    static findAll(page: number, size: number) {

        return axiosApi.get<Page<InventoryType>>("inventory-type", {params: {page, size}});
    }

    static save(inventoryType: InventoryType) {

        return axiosApi.post<InventoryType>("inventory-type", inventoryType);
    }

    static delete(inventoryTypeId: number) {

        return axiosApi.delete(`inventory-type/${inventoryTypeId}`);
    }
}