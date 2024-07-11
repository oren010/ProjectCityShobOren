import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorWidgetComponent } from './sensor-widget.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SensorWidgetComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [SensorWidgetComponent]
})
export class SensorWidgetModule { }
