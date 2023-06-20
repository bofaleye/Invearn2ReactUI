export interface RequestDemoModel{
    "description"?: string;
    "isActive"?: boolean;
    "fullText"?: string;
    "tags"?: string;
    "caption"?: string;
    "name": string;
    "email": string;
    "organisation": string;
    "designation": string;
    "message": string;
}

export interface RequestDemoPayload{
    "name": string;
    "email": string;
    "organisation": string;
    "designation": string;
    "message": string;
    "id": string;
    "description"?: string;
    "isActive": boolean;
    "createdByUserId": string;
    "dateCreated": string;// Date
    "updatedByUserId"?:string;
    "dateUpdated": string; // Date
    "deletedByUserId"?: string;
    "isDeleted": boolean;
    "dateDeleted"?: string; // Date
    "rowVersion": string;
    "fullText"?: string;
    "tags"?: string;
    "caption"?: string;
}