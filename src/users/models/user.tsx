interface carItem{
    productId: string;
    cantidad: number
}
export interface LoginForm{
    name: string
    email: string;
    password: string;
}


export  interface User extends LoginForm{
    _id: string;
    user_type?: string;
    car?: carItem[]
}
