import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDialogRef, MAT_DIALOG_DATA,MAT_DIALOG_DEFAULT_OPTIONS,
    MatButtonModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
    MatSortModule, MatTableModule, MatTooltipModule, MatDialogModule, MatCheckboxModule, 
    MatIconModule, MatSelectModule, MatTreeModule, MatTabsModule, MatDatepickerModule, 
    DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatMenuModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableExporterModule } from 'mat-table-exporter';

import {HtmlFormComponent} from '../lib/lib-components/htmlform-component/htmlform.component';
import {DialogFormSearchInputComponent} from '../lib/lib-components/htmlform-component/htmlform.component';
import {HtmlTableComponent} from '../lib/lib-components/htmltable-component/htmltable.component';
import {DialogTableSearchInputComponent} from '../lib/lib-components/htmltable-component/htmltable.component';


@NgModule({
    declarations: [      
      DialogFormSearchInputComponent,
      DialogTableSearchInputComponent,
      HtmlFormComponent,
      HtmlTableComponent, 
    ],
    entryComponents: [DialogFormSearchInputComponent,DialogTableSearchInputComponent],
    imports: [  
        MatDialogModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        MatButtonModule,
        MatInputModule,
        MatMenuModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatTableExporterModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatIconModule,
        MatSelectModule,
        MatTreeModule,
        MatTabsModule,
        
        
    ],
    exports: [HtmlFormComponent,HtmlTableComponent,DialogFormSearchInputComponent,DialogTableSearchInputComponent],
    providers: [
        {
                provide:MatDialogRef,
                useValue:{}
            },    
            { provide:MAT_DIALOG_DATA,
               useValue:{}
            },
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { }},                               
      
      ]
  })
  export class LibCustomModule {
  
  
   }
  