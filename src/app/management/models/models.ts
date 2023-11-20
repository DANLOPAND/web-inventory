export interface employee {
    cc: string;
    name: string;
    lastName: string;
    role: role
    password: string;
}

export interface role {
    roleId: number;
    userType: string;
}

export interface product {
    productId?: number;
    productName: string;
    price?: number;
    unitCompensation?: number
    packageCompensation: number
    productRole?: role;
}

export interface production {
    product?: product;
    employee?: employee;
    productionId: string;
    productionDate: Date;
    amount: number;
    compensation?: number;
    total?: number;
    percentage?: number;
}