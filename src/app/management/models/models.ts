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
    productID: number;
    productName: string;
    Price: number;
    unitCompensation: Float32Array
    packageCompensation: Float32Array
    productRoleID: number;
}

export interface production {
    productionID: number;
    employeeID: string;
    productID: number;
    productionDate: Date;
    ammount: number;
}