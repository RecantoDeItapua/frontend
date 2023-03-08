export interface IResident {
    id: any;
    name: string;
    cpf: string;
    email:string;
    phoneNumber?:string
    adress?:string
    password:string,
    discount?:number,
    profiles: string[],
    date:any;
}