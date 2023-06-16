import { Nullable } from '@core/types/nullable';
import { InputmaskOptions } from '@ngneat/input-mask';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ErrorMessage } from '@shared/modules/my-input/interfaces/error-message.interface';
import { AbstractControl, ControlContainer, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DAY_AND_RECEIPT_MASK, HARDWARE_OR_SOFTWARE_ID_MASK, UUID_MASK } from '@app/config/mask-input/mask-input.config';
import { BANK_ACCOUNT_MASK, DATE_MASK, HOUR_MASK, InputMaskType, NIP_MASK, POSTCODE_MASK, TELEPHONE_MASK, UNIQUE_NUMBER_MASK } from '@app/config/mask-input/mask-input.config';

@Component({
  selector: 'my-input',
  exportAs: 'input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class MyInputComponent {

  @ViewChild(MatFormFieldControl, { static: true }) control: MatFormFieldControl<string>;

  @Input() controlForm: AbstractControl;
  @Input() controlName: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type = 'text';
  @Input() maxLength = 524287;//Maximum length of HTML input
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() lzErrorMessage: Partial<ErrorMessage>;
  @Input() readonly = false;
  @Input() touchedPlaceholder = false;
  @Input() suffixTemplate: TemplateRef<Nullable<unknown>>;
  @Input() hint: TemplateRef<Nullable<unknown>>;
  @Input() suffixOutsideTemplate: TemplateRef<Nullable<unknown>>;
  @Input() hintAlign: 'end' | 'start' = 'end';
  @Input() optional = false;
  @Input() autocomplete: string;

  @Input() set mask(value: InputMaskType) {
    this._mask = this.setMask(value);
  }

  _mask: InputmaskOptions<unknown>;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formGroupDirective: FormGroupDirective,
  ) { }

  get getControl(): FormControl {
    if (this.controlForm) {
      return this.controlForm as FormControl;
    }
    return this.formGroupDirective.form.controls[this.controlName] as FormControl;
  }

  get visiblePlaceholder(): string {
    if (this.readonly || this.getControl.touched)
      return null;

    if (this.touchedPlaceholder)
      return this.placeholder;

    return this.placeholder;
  }

  get errorMessage(): Nullable<string> {
    if (!this.lzErrorMessage || !this.getControl.errors)
      return null;

    for (const [key] of Object.entries(this.getControl.errors)) {
      if (Object.prototype.hasOwnProperty.call(this.getControl.errors, key))
        return this.lzErrorMessage[key as keyof ErrorMessage];
    }
    return null;
  }

  setMask(value: InputMaskType): InputmaskOptions<unknown> {
    switch (value) {
      case 'nip': return NIP_MASK;
      case 'date': return DATE_MASK;
      case 'post-code': return POSTCODE_MASK;
      case 'telephone': return TELEPHONE_MASK;
      case 'bank': return BANK_ACCOUNT_MASK;
      case 'hour': return HOUR_MASK;
      case 'uniqueNumber': return UNIQUE_NUMBER_MASK;
      case 'hardwareId':
      case 'softwareId': return HARDWARE_OR_SOFTWARE_ID_MASK;
      case 'dayAndReceipt': return DAY_AND_RECEIPT_MASK;
      case 'uuid': return UUID_MASK;
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
