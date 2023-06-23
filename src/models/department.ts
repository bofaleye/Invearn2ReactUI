export class  DepartmentModel {
    id!: string;
    name!: string;
    description!: string;
    organisationId!: string;

    constructor(name: string, organisationId: string, description: string, id?: string){
        this.name = name;
        this.description = description;
        this.organisationId = organisationId;
        this.id = id || '';
    }
    
}
