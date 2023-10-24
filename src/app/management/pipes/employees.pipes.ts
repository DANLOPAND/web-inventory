import { Pipe, PipeTransform } from "@angular/core";
import { employee } from "../models/models";

@Pipe({
  name: "transformEmployeesPipe",
})
export class TransformEmployeesPipe implements PipeTransform {
  transform(data: any[]): employee[] {
    console.log(data);
    const employees: employee[] = [];
    data.forEach((data: any) => {
      const employee: employee = {
        cc: data.cc,
        name: data.name,
        lastName: data.lastName,
        role: data.role,
        password: data.password,
      };

      employees.push(employee);
    });

    return employees;
  }
}

@Pipe({
  name: "transformEmployeePipe",
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