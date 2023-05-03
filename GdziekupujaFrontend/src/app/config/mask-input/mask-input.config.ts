import { createMask } from '@ngneat/input-mask';

export type InputMaskType = 'nip' | 'post-code' | 'telephone' | 'date' | 'bank' | 'uniqueNumber' | 'hour' | 'hardwareId' | 'softwareId' | 'dayAndReceipt' | 'uuid';

export const HOUR_MASK = createMask({
	alias: 'datetime',
	inputFormat: 'HH:MM',
	placeholder: '__:__',
	insertMode: false,
	insertModeVisual: false,
});

export const UNIQUE_NUMBER_MASK = createMask({
	mask: 'AAA 9999999999',
	parser: (value: string) => {
		return value.replace(" ", "").toUpperCase();
	}
});

export const NIP_MASK = createMask({
	mask: '999-999-99-99',
	jitMasking: true,
	autoUnmask: true,
});

export const POSTCODE_MASK = createMask({
	mask: '99-999',
	autoUnmask: true,
	jitMasking: true
});

export const TELEPHONE_MASK = createMask({
	mask: '999 999 999',
	autoUnmask: true,
	jitMasking: true
});

export const DATE_MASK = createMask({
	alias: 'datetime',
	inputFormat: 'yyyy-mm-dd',
	placeholder: '____-__-__',
	insertMode: false,
	insertModeVisual: false,
});

export const BANK_ACCOUNT_MASK = createMask({
	mask: '99 9999 9999 9999 9999 9999 9999',
	jitMasking: true,
	autoUnmask: true,
	removeMaskOnSubmit: true,
});

export const HARDWARE_OR_SOFTWARE_ID_MASK = createMask({
	mask: '****************************************************************',
});

export const UUID_MASK = createMask({
	mask: '********-****-****-****-************'
});

//TODO NIE DZIAŁA SPRAWDZIĆ DLACZEGO
export const DAY_AND_RECEIPT_MASK = createMask({
	mask: '_/_',
	insertMode: false,
	insertModeVisual: false,
});