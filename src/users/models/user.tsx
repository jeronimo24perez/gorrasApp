interface carItem{
    productId: string;
    cantidad: number
}
export interface LoginForm{
    username: string
    email: string;
    password: string;
}


export  interface User extends LoginForm{
    _id: string;
    user_type?: string;
    car?: carItem[]
}
