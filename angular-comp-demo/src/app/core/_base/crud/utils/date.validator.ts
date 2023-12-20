import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import * as moment from 'moment'

export class DateValidator {
    
  static dateValidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()  
      && !moment(AC.value, 'DD/MM/YYYY', true).isValid()) {
        return { 'dateValidator': true };
    }
    return null;
  }
  
  static dateMinimum(mindate: string): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
          if (control.value == null) {
              return null;
          }
          const controlDate = moment(control.value, '01/01/1990');
          if (!controlDate.isValid()) {
              return null;
          }

          const validationDate = moment(mindate);

          return controlDate.isBefore(validationDate) ? null : {
              'date-minimum': {
                  'date-minimum': validationDate.format('01/01/1990'),
                  'actuel': controlDate.format('01/01/1990')
              }
          };
      };
  }

  static dateMaximum(maxdate: string): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
          if (control.value == null) {
              return null;
          }

          const controlDate = moment(control.value, '');

          if (!controlDate.isValid()) {
              return null;
          }

          const validationDate = moment(maxdate);

          return controlDate.isAfter(validationDate) ? null : {
              'date-maximum': {
                  'date-maximum': validationDate.format(''),
                  'actuel': controlDate.format('')
              }
          };
      };
  }
}
