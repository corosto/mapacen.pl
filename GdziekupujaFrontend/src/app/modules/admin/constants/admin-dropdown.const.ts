import { UserComponent } from "@modules/admin/pages/user/user.component";
import { OfferComponent } from "@modules/admin/pages/offer/offer.component";
import { UserService } from "@modules/admin/pages/user/services/user.service";
import { OfferService } from "@modules/admin/pages/offer/services/offer.service";
import { ProductComponent } from "@modules/admin/pages/product/product.component";
import { CategoryComponent } from "@modules/admin/pages/category/category.component";
import { ProductService } from "@modules/admin/pages/product/services/product.service";
import { AdminDropdownData } from "@modules/admin/interfaces/admin-dropdown.interface";
import { CategoryService } from "@modules/admin/pages/category/services/category.service";
import { SalesPointComponent } from "@modules/admin/pages/sales-point/sales-point.component";
import { SalesPointService } from "@modules/admin/pages/sales-point/services/sales-point.service";
import { NestedDropdown } from "@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface";

export const AdminDropDown: NestedDropdown<AdminDropdownData>[] =
  [
    {
      text: 'Oferta',
      data: {
        formComponent: OfferComponent,
        formProvider: OfferService,
      },
      serviceAdminOnly: false,
    },
    {
      text: 'Produkt',
      data: {
        formComponent: ProductComponent,
        formProvider: ProductService,
      },
      serviceAdminOnly: false,
    },
    {
      text: 'Kategoria',
      data: {
        formComponent: CategoryComponent,
        formProvider: CategoryService,
      },
      serviceAdminOnly: false,
    },
    {
      text: 'Punkt sprzedaży',
      data: {
        formComponent: SalesPointComponent,
        formProvider: SalesPointService,
      },
      serviceAdminOnly: false,
    },
    {
      text: 'Użytkownik',
      data: {
        formComponent: UserComponent,
        formProvider: UserService,
      },
    serviceAdminOnly: true,
    },
  ];