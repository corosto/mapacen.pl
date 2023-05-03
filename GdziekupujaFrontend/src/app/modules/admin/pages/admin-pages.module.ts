import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UserComponent } from '@modules/admin/pages/user/user.component';
import { MyInputModule } from '@shared/modules/my-input/my-input.module';
import { OfferComponent } from '@modules/admin/pages/offer/offer.component';
import { ProductComponent } from '@modules/admin/pages/product/product.component';
import { CategoryComponent } from '@modules/admin/pages/category/category.component';
import { SalesPointComponent } from '@modules/admin/pages/sales-point/sales-point.component';
import { Base64Component } from '@modules/admin/pages/product/components/base64/base64.component';
import { UserBanComponent } from '@modules/admin/pages/user/components/user-ban/user-ban.component';
import { UserFormHandlerService } from '@modules/admin/pages/user/services/user-form-handler.service';
import { OfferAddComponent } from '@modules/admin/pages/offer/components/offer-add/offer-add.component';
import { OfferFormHandlerService } from '@modules/admin/pages/offer/services/offer-form-handler.service';
import { UserUnbanComponent } from '@modules/admin/pages/user/components/user-unban/user-unban.component';
import { ProductFormHandlerService } from '@modules/admin/pages/product/services/product-form-handler.service';
import { ProductAddComponent } from '@modules/admin/pages/product/components/product-add/product-add.component';
import { OfferModifyComponent } from '@modules/admin/pages/offer/components/offer-modify/offer-modify.component';
import { CategoryFormHandlerService } from '@modules/admin/pages/category/services/category-form-handler.service';
import { CategoryAddComponent } from '@modules/admin/pages/category/components/category-add/category-add.component';
import { UserSetActionComponent } from '@modules/admin/pages/user/components/user-set-action/user-set-action.component';
import { ProductModifyComponent } from '@modules/admin/pages/product/components/product-modify/product-modify.component';
import { SalesPointFormHandlerService } from '@modules/admin/pages/sales-point/services/sales-point-form-handler.service';
import { UserTypeSwitchComponent } from '@modules/admin/pages/user/components/user-type-switch/user-type-switch.component';
import { OfferSetActionComponent } from '@modules/admin/pages/offer/components/offer-set-action/offer-set-action.component';
import { CategoryModifyComponent } from '@modules/admin/pages/category/components/category-modify/category-modify.component';
import { SalesPointAddComponent } from '@modules/admin/pages/sales-point/components/sales-point-add/sales-point-add.component';
import { OfferTypeSwitchComponent } from '@modules/admin/pages/offer/components/offer-type-switch/offer-type-switch.component';
import { ProductSetActionComponent } from '@modules/admin/pages/product/components/product-set-action/product-set-action.component';
import { ProductTypeSwitchComponent } from '@modules/admin/pages/product/components/product-type-switch/product-type-switch.component';
import { SalesPointModifyComponent } from '@modules/admin/pages/sales-point/components/sales-point-modify/sales-point-modify.component';
import { CategorySetActionComponent } from '@modules/admin/pages/category/components/category-set-action/category-set-action.component';
import { CategoryTypeSwitchComponent } from '@modules/admin/pages/category/components/category-type-switch/category-type-switch.component';
import { SalesPointSetActionComponent } from '@modules/admin/pages/sales-point/components/sales-point-set-action/sales-point-set-action.component';
import { SalesPointTypeSwitchComponent } from '@modules/admin/pages/sales-point/components/sales-point-type-switch/sales-point-type-switch.component';

@NgModule({
  declarations: [
    UserComponent,
    OfferComponent,
    Base64Component,
    UserBanComponent,
    ProductComponent,
    OfferAddComponent,
    CategoryComponent,
    UserUnbanComponent,
    SalesPointComponent,
    ProductAddComponent,
    CategoryAddComponent,
    OfferModifyComponent,
    UserSetActionComponent,
    ProductModifyComponent,
    SalesPointAddComponent,
    OfferSetActionComponent,
    CategoryModifyComponent,
    UserTypeSwitchComponent,
    OfferTypeSwitchComponent,
    ProductSetActionComponent,
    SalesPointModifyComponent,
    CategorySetActionComponent,
    ProductTypeSwitchComponent,
    CategoryTypeSwitchComponent,
    SalesPointSetActionComponent,
    SalesPointTypeSwitchComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatIconModule,
    MyInputModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatButtonToggleModule,
  ],
  providers: [
    UserFormHandlerService,
    OfferFormHandlerService,
    ProductFormHandlerService,
    CategoryFormHandlerService,
    SalesPointFormHandlerService,
  ]
})
export class AdminPagesModule { }
