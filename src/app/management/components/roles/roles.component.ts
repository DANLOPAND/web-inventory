import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../../management.service';
import { role } from '../../models/models';
import { stateRequest } from '../../models/enum';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  constructor(private _managementService: ManagementService) {}

  public roles: role[] = [];
  public loading: boolean = true;

  private stateRequest = stateRequest;

  ngOnInit(): void {

    this.getRoles();

    // this._managementService
    //   .createRole({
    //     userType: 'starfiedl',
    //   })
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
  }

  getRoles(): void {
    const rolesInfo = this._managementService.rolesInfo;

    if (
      this._managementService.stateGetRoles === this.stateRequest.notExcuted
    ) {
      if (this._managementService.loadingEmployees) {
        this._managementService._infoRolesObservable.subscribe((data) => {
          this.roles = data;
          this.loading = false;
        });
      } else {
        this._managementService.getRoles().subscribe((data) => {
          if (data.valid) {
            this.roles = data.print;
            this.loading = false;
          }
        });
      }
    } else {
      this.roles = rolesInfo;
      this.loading = false;
    }
  }
}
