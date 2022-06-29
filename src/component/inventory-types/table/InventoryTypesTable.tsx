import {Table, TableContainer} from "@mui/material";
import InventoryTypesTableHeader from "./InventoryTypesTableHeader";
import InventoryTypesTableBody from "./InventoryTypesTableBody";
import inventoryTypesTableStyles from '../InventoryTypes.module.css'
import InventoryTypesTableFooter from "./InventoryTypesTableFooter";

function InventoryTypesTable() {

    return (
        <TableContainer className={inventoryTypesTableStyles.MuiTableContainer_root}>
            <Table>
                <InventoryTypesTableHeader/>
                <InventoryTypesTableBody/>
                <InventoryTypesTableFooter/>
            </Table>
        </TableContainer>
    );
}

export default InventoryTypesTable;