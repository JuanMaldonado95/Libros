import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  InventarioLibros,
  InventarioService,
  LibrosColumns
} from 'src/app/services/inventario.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inventario-libros',
  templateUrl: './inventario-libros.component.html',
  styleUrls: ['./inventario-libros.component.scss'],
})
export class InventarioLibrosComponent {
  displayedColumns: string[] = LibrosColumns.map((col) => col.key);
  columnsSchema: any = LibrosColumns;
  dataSource = new MatTableDataSource<InventarioLibros>();
  valid: any = {};
  tRespuestaPostCrearLibro?: string;
  tRespuestaEliminarLibro?: string;
  tListaRespuestasEliminarLibro?: string;
  tRespuestaEditarLibro?: string;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _inventarioService: InventarioService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this._inventarioService.getInventarioLibros().subscribe((x) => {
      this.dataSource.data = x;
    });
  }

  editRow(row: InventarioLibros) {
    if (row.iIDInventarioLibros === 0) {
      this._inventarioService.addLibro(row).subscribe((x) => {
        row.isEdit = false;
        this.tRespuestaPostCrearLibro = x;
        console.log(x);
        if (this.tRespuestaPostCrearLibro) {
          this._snackBar.open(this.tRespuestaPostCrearLibro, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      });
    } else {
      this._inventarioService
        .updateLibro(row)
        .subscribe((x) => {
          if (x) {
            this.tRespuestaEditarLibro = x.message;
            if (this.tRespuestaEditarLibro)
              this._snackBar.open(this.tRespuestaEditarLibro, 'X', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
            if (x.libro) {
              this.dataSource.data = this.dataSource.data.filter(
                (u: InventarioLibros) => u.iIDInventarioLibros !== row.iIDInventarioLibros
              );
            }
            row.isEdit = false;
          }
        });
    }
  }

  addRow() {
    const newRow: InventarioLibros = {
      iIDInventarioLibros: 0,
      tNombreLibro: '',
      tGeneroLibro: '',
      tTipoLibro: '',
      tAutorLibro: '',
      dtFechaPublicacion: new Date(),
      tEditorial: '',
      tEstadoLibro: '',
      tIdioma: '',
      iNumeroEjemplares: 0,
      iIDUsuarioCalificacion: 0,
      tResenaUsuario: '',
      tPuntuacionUsuario: '',
      isEdit: true,
      isSelected: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(iIDInventarioLibros: number) {
    console.log(iIDInventarioLibros);
    this._inventarioService.deleteLibro(iIDInventarioLibros).subscribe((x) => {
      this.tRespuestaEliminarLibro = x;
      console.log(x);
      if (this.tRespuestaEliminarLibro) {
        this._snackBar.open(this.tRespuestaEliminarLibro, 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
      this.dataSource.data = this.dataSource.data.filter(
        (u: InventarioLibros) => u.iIDInventarioLibros !== iIDInventarioLibros
      );
    });
  }

  removeSelectedRows() {
    let respuestasEliminadas = 0;
    const libros = this.dataSource.data.filter(
      (u: InventarioLibros) => u.isSelected
    );
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          for (let i = 0; i <= libros.length; i++) {
            const iIDInventarioLibros = libros[i].iIDInventarioLibros;
            this._inventarioService
              .deleteLibro(iIDInventarioLibros)
              .subscribe(() => {
                respuestasEliminadas++;
                if (respuestasEliminadas === libros.length) {
                  this._snackBar.open(
                    'Se eliminaron todos los registros.',
                    'X',
                    {
                      horizontalPosition: 'right',
                      verticalPosition: 'top',
                    }
                  );
                }
                this.dataSource.data = this.dataSource.data.filter(
                  (u: InventarioLibros) => !u.isSelected
                );
              });
          }
        }
      });
  }

  inputHandler(e: any, iIDInventarioLibros: number, key: string) {
    if (!this.valid[iIDInventarioLibros]) {
      this.valid[iIDInventarioLibros] = {};
    }
    this.valid[iIDInventarioLibros][key] = e.target.validity.valid;
  }

  disableSubmit(iIDInventarioLibros: number) {
    if (this.valid[iIDInventarioLibros]) {
      return Object.values(this.valid[iIDInventarioLibros]).some(
        (item) => item === false
      );
    }
    return false;
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected);
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected);
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }));
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSizes = [5, 10, 20];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
