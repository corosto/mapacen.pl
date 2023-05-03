export interface NestedDropdown<T> {
  text: DropDownText,
  data?: T,
  canShow?: boolean,
  serviceAdminOnly: boolean,
}

export type DropDownText = 'Oferta' | 'Produkt' | 'Kategoria' | 'Punkt sprzedaży' | 'Użytkownik';