import { Pipe, PipeTransform } from '@angular/core';
import { employee, product, production, role } from './models/models';

@Pipe({
  name: 'transformEmployeesPipe',
})
export class TransformEmployeesPipe implements PipeTransform {
  transform(data: any[]): employee[] {
    const employees: employee[] = [];
    data.forEach((data: any) => {
      const employee: employee = {
        cc: data.cc,
        name: data.name,
        lastName: data.lastName,
        role: {
          roleId: data.role.roleId,
          userType: data.role.userType,
        },
        password: data.password,
      };

      employees.push(employee);
    });

    return employees;
  }
}

@Pipe({
  name: 'transformEmployeePipe',
})
export class TransformEmployeePipe implements PipeTransform {
  transform(data: any): employee {
    const employee: employee = {
      cc: data.cc,
      name: data.name,
      lastName: data.lastName,
      role: data.role,
      password: data.password,
    };

    return employee;
  }
}

@Pipe({
  name: 'filterEmployeesPipe',
})
export class FilterEmployeesPipe implements PipeTransform {
  transform(
    data: employee[],
    searchText: string,
    selectedFilter: number,
    ascendent: boolean
  ): employee[] {
    if (searchText !== '') {
      data = data.filter((employee) => {
        return (
          employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }

    if (selectedFilter === 0) {
      data.sort((a, b) => {
        if (ascendent) {
          return parseInt(a.cc) - parseInt(b.cc);
        } else {
          return parseInt(b.cc) - parseInt(a.cc);
        }
      });
    } else if (selectedFilter === 1) {
      data.sort((a, b) => {
        if (ascendent) {
          return (a.name + a.lastName).localeCompare(b.name + b.lastName);
        } else {
          return (b.name + b.lastName).localeCompare(a.name + a.lastName);
        }
      });
    } else if (selectedFilter === 2) {
      data.sort((a, b) => {
        if (ascendent) {
          return a.lastName.localeCompare(b.lastName);
        } else {
          return b.lastName.localeCompare(a.lastName);
        }
      });
    } else if (selectedFilter === 3) {
      data.sort((a, b) => {
        if (ascendent) {
          return a.role.userType.localeCompare(b.role.userType);
        } else {
          return b.role.userType.localeCompare(a.role.userType);
        }
      });
    }

    return data;
  }
}

@Pipe({
  name: 'transformRolesPipe',
})
export class TransformRolesPipe implements PipeTransform {
  transform(data: any[]): role[] {
    const roles: any[] = [];
    data.forEach((data: any) => {
      const role: any = {
        roleId: data.roleId,
        userType: data.userType,
      };

      roles.push(role);
    });

    return roles;
  }
}

@Pipe({
  name: 'filterRolesPipe',
})
export class FilterRolesPipe implements PipeTransform {
  transform(
    data: any[],
    searchText: string,
    selectedFilter: number,
    ascendent: boolean
  ): any[] {
    if (searchText !== '') {
      data = data.filter((role) => {
        return role.userType.toLowerCase().includes(searchText.toLowerCase());
      });
    }
    if (selectedFilter === 0) {
      data.sort((a, b) => {
        if (ascendent) {
          return a.roleId - b.roleId;
        } else {
          return b.roleId - a.roleId;
        }
      });
    } else if (selectedFilter === 1) {
      data.sort((a, b) => {
        if (ascendent) {
          return a.userType.localeCompare(b.userType);
        } else {
          return b.userType.localeCompare(a.userType);
        }
      });
    }

    return data;
  }
}

@Pipe({
  name: 'transformProductionsPipe',
})
export class TransformProductionsPipe implements PipeTransform {
  transform(data: any): production[] {
    const productions: production[] = [];
    data?.production?.forEach((data: any) => {
      const production: production = {
        product: {
          productId: data?.productId,
          productName: data?.productName,
          price: data?.unitPrice,
          unitCompensation: data?.unitCompensation,
          packageCompensation: data?.packageCompensation,
        },
        employee: {
          cc: data?.cc,
          name: data?.name,
          lastName: data?.lastName,
          role: data?.role,
          password: data?.password,
        },
        productionId: data?.productionId || 0,
        productionDate: data.productionDate,
        total: data.price,
        amount: data.quantity,
        percentage: data.percentage,
        compensation: data.compensation,
      };
      productions.push(production);
    });

    return productions;
  }
}

@Pipe({
  name: 'filterProductionsPipe',
})
export class FilterProductionsPipe implements PipeTransform {
  transform(
    data: production[],
    searchText: string,
    selectedFilter: number,
    ascendent: boolean
  ): production[] {
    if (searchText !== '') {
      data = data.filter((production) => {
        return (
          production.employee?.name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          production.product?.productName
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      });
    }

    if (selectedFilter === 0) {
      data.sort((a, b) => {
        if (ascendent) {
          return parseInt(a.productionId) - parseInt(b.productionId);
        } else {
          return parseInt(b.productionId) - parseInt(a.productionId);
        }
      });
    } else if (selectedFilter === 1) {
      data.sort((a, b) => {
        if (ascendent) {
          return (
            (a.employee?.name || '').localeCompare(b.employee?.name || '') ||
            (a.employee?.lastName || '').localeCompare(
              b.employee?.lastName || ''
            )
          );
        } else {
          return (
            (b.employee?.name || '').localeCompare(a.employee?.name || '') ||
            (b.employee?.lastName || '').localeCompare(
              a.employee?.lastName || ''
            )
          );
        }
      });
    } else if (selectedFilter === 2) {
      data.sort((a, b) => {
        if (ascendent) {
          return (a.product?.productName || '').localeCompare(
            b.product?.productName || ''
          );
        } else {
          return (b.product?.productName || '').localeCompare(
            a.product?.productName || ''
          );
        }
      });
    } else if (selectedFilter === 4) {
      data.sort((a, b) => {
        if (ascendent) {
          return a.amount - b.amount;
        } else {
          return b.amount - a.amount;
        }
      });
    } else if (selectedFilter === 3) {
      data.sort((a, b) => {
        if (ascendent) {
          //CONVErt string to date
          return (
            new Date(a.productionDate).getTime() -
            new Date(b.productionDate).getTime()
          );
        } else {
          return (
            new Date(b.productionDate).getTime() -
            new Date(a.productionDate).getTime()
          );
        }
      });
    } else if (selectedFilter === 5) {
      data.sort((a, b) => {
        if (ascendent) {
          return (a?.total || 0) - (b?.total || 0);
        } else {
          return (b?.total || 0) - (a.total || 0);
        }
      });
    }

    return data;
  }
}

@Pipe({
  name: 'transformProductsPipe',
})
export class TransformProductsPipe implements PipeTransform {
  transform(data: any[]): product[] {
    const products: product[] = [];
    data.forEach((data: any) => {
      const product: product = {
        productId: data.productId,
        productName: data.productName,
        price: data.price,
        unitCompensation: data.unitCompensation,
        packageCompensation: data.packagesCompensation,
        productRole: {
          roleId: data?.productRole.roleId,
          userType: data?.productRole.userType,
        },
      };
      products.push(product);
    });

    return products;
  }
}

@Pipe({
  name: 'filterProductsPipe',
})
export class FilterProductsPipe implements PipeTransform {
  transform(
    data: product[],
    searchText: string,
    selectedFilter: number,
    ascendent: boolean
  ): product[] {
    if (searchText !== '') {
      data = data.filter((product) => {
        return product.productName
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
    }

    if (selectedFilter === 0) {
      data.sort((a, b) => {
        if (ascendent) {
          return (a?.productId || 0) - (b?.productId || 0);
        } else {
          return (b?.productId || 0) - (a.productId || 0);
        }
      });
    } else if (selectedFilter === 1) {
      data.sort((a, b) => {
        if (ascendent) {
          return a.productName.localeCompare(b.productName);
        } else {
          return b.productName.localeCompare(a.productName);
        }
      });
    } else if (selectedFilter === 2) {
      //by role name 
      data.sort((a, b) => {
        if (ascendent) {
          return (a.productRole?.userType || "").localeCompare(b.productRole?.userType || '') 
        } else {
          return (b.productRole?.userType || "").localeCompare(a.productRole?.userType || '')
        }
      });
    } else if (selectedFilter === 3) {
      data.sort((a, b) => {
        if (ascendent) {
          return (a?.price || 0) - (b?.price || 0);
        } else {
          return (b?.price || 0) - (a.price || 0);
        }
      });
    } else if (selectedFilter === 4) {
      data.sort((a, b) => {
        if (ascendent) {
          return (a?.unitCompensation || 0) - (b?.unitCompensation || 0);
        } else {
          return (b?.unitCompensation || 0) - (a.unitCompensation || 0);
        }
      });
    } else if (selectedFilter === 5) {
      data.sort((a, b) => {
        if (ascendent) {
          return (
            (a?.packageCompensation || 0) - (b?.packageCompensation || 0)
          );
        } else {
          return (
            (b?.packageCompensation || 0) - (a.packageCompensation || 0)
          );
        }
      });
    }

    return data;
  }
}

//filterProductsByRole
@Pipe({
  name: 'filterProductsByRolePipe',
})
export class FilterProductsByRolePipe implements PipeTransform {
  transform(data: product[], role: string): product[] {
    return data.filter((product: product) => {
      return product.productRole?.roleId.toString() == role;
    });
  }
}
