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
    quantity:undefined|number,
    productId:undefined|number
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
export interface priceSummary{
    price:number,
    tax:number,
    delivery:number,
    discount:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number|undefined
}
