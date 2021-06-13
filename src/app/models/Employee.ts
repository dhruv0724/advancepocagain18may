import { Product } from "./Products";

export interface Employee{
    id : string
    employee_name:string
    email:string
    emp_address:string
    emp_phone:string
    password:string,
    isBlocked:boolean,
    image64?:string,
    cart:{product:Product,quantity:number}[];
}