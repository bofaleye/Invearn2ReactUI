export class UnitModel {
    id!: string;
    name!: string;
    description!: string;
    departmentId!: string;
   
    constructor(name: string, description:string, departmentId: string, id?: string, ) {
        this.id = id || '';
        this.departmentId = departmentId;
        this.description = description;
        this.name = name;
    }
}