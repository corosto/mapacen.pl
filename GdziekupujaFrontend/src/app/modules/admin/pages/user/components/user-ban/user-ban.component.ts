import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@modules/top-menu/interfaces/top-menu.interface';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { UserFormHandlerService } from '@modules/admin/pages/user/services/user-form-handler.service';

@Component({
  selector: 'user-ban',
  templateUrl: './user-ban.component.html',
  styleUrls: ['./user-ban.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class UserBanComponent implements OnInit {

  form: FormGroup;
  users: UserInfo[] = [];

  constructor(
    private controlContainer: ControlContainer,
    private userFormHandlerService: UserFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.userFormHandlerService.setFormGroupForUserBan(this.form);

    this.adminStorageService.users$.asObservable().subscribe((res) => {
      res.map((result) => {
        if (result.canComment) {
          this.users.push(result)
        }
      });
    });
  }
}