import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Variant, VariantResponse } from '../../interfaces/search';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-layout-search',
  templateUrl: './layout-search.component.html',
  styleUrls: ['./layout-search.component.css'],
})
export class LayoutSearchComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Variant>();
  selectedColumn = ''; // Columna seleccionada para búsqueda
  searchValue = ''; // Valor a buscar
  totalDocuments = 0; // Total de documentos en la base de datos
  pageSize = 20; // Tamaño de la página inicial
  lastId: string | null = null; // Último ID para paginación

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    // Cargar datos iniciales al cargar el componente
    this.getAllVariants();
  }

  /**
   * Carga inicial de todas las variantes sin filtros
   */
  getAllVariants(): void {
    this.searchService
      .getAllVariants(this.lastId, this.pageSize)
      .subscribe({
        next: (response: VariantResponse) => {
          this.dataSource.data = response.variants;
          this.totalDocuments = response.total_documents;
          this.lastId = response.last_id || null;
          this.displayedColumns = this.getDynamicColumns(response.variants);
        },
        error: (error) => {
          console.error('Error fetching all variants:', error);
        },
      });
  }

  /**
   * Obtiene variantes filtradas por columna y valor
   */
  getBulkVariants(): void {
    if (!this.selectedColumn || !this.searchValue) {
      console.error('Debes seleccionar una columna y un valor para buscar.');
      return;
    }

    this.searchService
      .getBulkVariants(this.selectedColumn, this.searchValue, this.lastId, this.pageSize)
      .subscribe({
        next: (response: VariantResponse) => {
          console.log('Bulk variants response:', response);
          this.dataSource.data = response.variants;
          this.totalDocuments = response.total_documents;
          this.lastId = response.last_id || null;
          this.displayedColumns = this.getDynamicColumns(response.variants);
        },
        error: (error) => {
          console.error('Error fetching bulk variants:', error);
        },
      });
  }

  /**
   * Genera las columnas dinámicamente según los datos
   */
  getDynamicColumns(data: Variant[]): string[] {
    return Array.from(
      data.reduce((columns, item) => {
        Object.keys(item).forEach((key) => {
          if (key !== '_id') {
            columns.add(key);
          }
        });
        return columns;
      }, new Set<string>())
    );
  }

  /**
   * Aplica filtros y usa getBulkVariants
   */
  applyFilter(): void {
    console.log('Filtros aplicados:', { selectedColumn: this.selectedColumn, searchValue: this.searchValue });
    this.selectedColumn = this.selectedColumn.trim();
    this.searchValue = this.searchValue.trim();
    if (!this.selectedColumn || !this.searchValue) {
      console.error('Debes seleccionar una columna y escribir un valor para buscar.');
      return;
    }

    this.lastId = null; // Reiniciar la lógica de paginación en el backend
    this.paginator.firstPage(); // Regresar el paginador a la primera página
    this.getBulkVariants(); // Realizar la búsqueda
  }


  /**
   * Maneja los cambios en el paginador
   */
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize; // Actualizar tamaño de página
    if (event.pageIndex === 0) {
      this.lastId = null; // Reiniciar paginación si es la primera página
    }
    // Decidir si se usa getAll o getBulk según si hay filtros
    if (this.selectedColumn && this.searchValue) {
      this.getBulkVariants();
    } else {
      this.getAllVariants();
    }
  }

  /**
   * Métodos para manejar acciones del menú de usuario
   */
  viewProfile() {
    console.log('Abrir perfil...');
    // Agregar lógica para abrir el perfil del usuario
  }

  viewSettings() {
    console.log('Abrir configuración...');
    // Agregar lógica para abrir las configuraciones del usuario
  }

  logout() {
    console.log('Cerrar sesión...');
    // Agregar lógica para cerrar sesión
  }
}
