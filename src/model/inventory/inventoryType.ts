export class InventoryType {
    public id: number | null = null;
    public title: string | null = null;


    constructor(id: number | null, title: string | null) {
        this.id = id;
        this.title = title;
    }
}