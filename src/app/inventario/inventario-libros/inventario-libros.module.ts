import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioLibrosRoutingModule } from './inventario-libros-routing.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    InventarioLibrosRoutingModule
  ]
})
export class InventarioLibrosModule { }
