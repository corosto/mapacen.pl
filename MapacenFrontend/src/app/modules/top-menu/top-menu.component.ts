import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TopMenuService } from '@modules/top-menu/api/top-menu.service';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';
import { idNameOnly, OfferContent } from '@modules/top-menu/interfaces/top-menu.interface';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { LoginDialogComponent } from '@modules/top-menu/components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TopMenuComponent implements OnInit {

  @Output() refreshOffers = new EventEmitter<OfferContent>();
  @Output() getFavourites = new EventEmitter();
  counties: idNameOnly[] = [];
  categories: idNameOnly[] = [];
  form: FormGroup;
  userName = '';
  userEmail = '';
  userLocalCounty = '';
  userProfileCounty = '';

  filteredCounties: string[];
  filteredCategories: string[];

  showUserInfo = false;
  logged: boolean;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private topMenuService: TopMenuService,
    private myLocalStorageService: MyLocalStorageService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      product: [null],
      category: [null],
      county: [null],
    });

    this.topMenuService.getAllCounties().subscribe((res) => {
      if (res) {
        this.counties = res;

        this.userProfileCounty = this.counties.find((res) => res.id.toString() === localStorage.getItem('userProfileCountyId'))?.name;
        const localCounty = this.counties.find((res) => res.id.toString() === localStorage.getItem('userLocalCountyId'))?.name;
        this.userName = localStorage.getItem('userName');
        this.userEmail = localStorage.getItem('userEmail');

        this.userLocalCounty = localCounty ? localCounty : this.userProfileCounty;

        if (!this.userLocalCounty) {
          this.userLocalCounty = '';
        }
      }
    })

    this.topMenuService.getAllCategories().subscribe((res) => {
      this.categories = res ? res : null;
    });

    this.logged = !!localStorage.getItem('userToken');
  }

  selectedCounty(): void {
    localStorage.setItem('userLocalCountyId', this.counties.find((res) => res.name === this.form.get('county').value)?.id.toString());

    this.refreshOffers.emit({
      search: this.form.get('product').value,
      category: this.categories.find((res) => res.name === this.form.get('category').value)?.id.toString(),
    })
  }

  search() {
    this.refreshOffers.emit({
      search: this.form.get('product').value,
      category: this.categories.find((res) => res.name === this.form.get('category').value)?.id.toString(),
    })
  }

  emitFavourites() {
    this.getFavourites.emit();
  }

  reload() {
    window.location.reload();
  }

  logIn() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '450px',
      height: '650px',
      panelClass: 'loginDialog',
      data: this.counties,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'logged') {
        const county = this.counties.find((res) => res.id.toString() === localStorage.getItem('userLocalCountyId'))?.name;
        this.userLocalCounty = county ? county : '';
        this.userName = localStorage.getItem('userName');
        this.userEmail = localStorage.getItem('userEmail');
      }
    });
  }

  logout() {
    this.myLocalStorageService.removeStorage();
    this.logged = false;
    this.reload();
  }
}