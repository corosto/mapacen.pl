import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';
import { NestedDropdown } from '@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface';

@Component({
  selector: 'lz-nested-dropdown',
  templateUrl: './lz-nested-dropdown.component.html',
  styleUrls: ['./lz-nested-dropdown.component.scss']
})
export class LzNestedDropdownComponent {

  @Input() set data(value: NestedDropdown<unknown>[]) {
    this.navData = value;
    this.serviceAdmin = this.myLocalStorageService.isServiceAdmin();
    this.navData = this.navData.map((res) => {
      if (res.serviceAdminOnly) {
        return {
          ...res,
          canShow: this.serviceAdmin,
        }
      }
      else {
        return {
          ...res,
          canShow: true,
        }
      }
    })
  }
  @Input() set name(value: string) {
    this.functionName = value;
  }
  @Input() canBeLockable = false;
  @Output() dropdownChange = new EventEmitter<NestedDropdown<unknown>>();

  navData: NestedDropdown<unknown>[];
  functionName: string;
  serviceAdmin: boolean;

  constructor(
    private myLocalStorageService: MyLocalStorageService,
  ) { }

  changeDropdown(item: NestedDropdown<unknown>) {
    this.dropdownChange.emit(item);
    this.functionName = item.text;
  }
}
