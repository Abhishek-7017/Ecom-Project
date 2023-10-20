export interface SignUp{
    name:string,
    password:string,
    email:string
}
export interface Login{
    email:string,
    password:string
}
export interface Product{
    name:string,
    price:number,
    color:string,
    category:string,
    image:string,
    description:string,
    id:number,
    quantity:undefined|number
}
export interface cart{
    name:string,
    price:number,
    color:string,
    category:string,
    image:string,
    description:string,
    id:number | undefined,
    quantity:undefined|number,
    productId:number,
    userId:number
}
