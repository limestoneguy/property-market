export interface Fields {
    Name: string;
    desccription: string;
    size: number;
}

export interface Record {
    id: string;
    createdTime: Date;
    fields: Fields;
}

export interface PropertyList {
    records: Record[];
}