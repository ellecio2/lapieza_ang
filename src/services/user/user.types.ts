export interface User
{
    id: number;
    name: string;
    full_name: string;
    username: string;
    group_id: number;
    email: string;
    avatar?: string;
    status?: string;
    authenticated: boolean;
    role: string;
    type?: string;
    data: string;
    user: string
}



export interface UserSubsc {
    id: string;
    user_id: string;
    module_id: string;
    create_date: any;
    end_date: string;
    data: [string, string][] | null;
    user_subscription: [string, string][] | null;
}


export interface UserHistoryPay {
    id: string;
    user_id: string;
    module_id: string;
    create_date: any;
    end_date: string;
    payment_amount: string;
    quantity: string;
    id_debt: string;
    id_subsc: string;
    pay_method: string;
    data: [string, string][] | null;
    user_pay: [string, string][] | null;
}


export interface UserPayDetails {
    id: string;
    user_id: string;
    module_id: string;
    module_name: string;
    school_id: string;
    school_name: string;
    create_date: any;
    end_date: string;
    amount: string;
    amount_tax: string;
    user_pay_id: string;
    data: [string, string][] | null;
    user_pay_details: [string, string][] | null;
}
