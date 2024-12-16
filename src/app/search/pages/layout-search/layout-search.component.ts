import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Variant, VariantResponse, VariantSort } from '../../interfaces/search';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-layout-search',
  templateUrl: './layout-search.component.html',
  styleUrls: ['./layout-search.component.css'],
})
export class LayoutSearchComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = []; // Columnas dinámicas
  dataSource = new MatTableDataSource<Variant>(); // Fuente de datos para la tabla
  selectedColumn = ''; // Columna seleccionada para búsqueda
  searchValue = ''; // Valor de búsqueda ingresado por el usuario
  totalDocuments = 0; // Total de documentos en la base de datos
  pageSize = 20; // Tamaño inicial de página
  lastId: string | null = null; // Último ID usado para paginación

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador
  @ViewChild(MatSort) sort!: MatSort; // Referencia al ordenamiento

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    // Inicializar datos al cargar el componente
    this.getAllVariants();
  }

  ngAfterViewInit(): void {
    // Configurar MatSort y MatPaginator después de cargar la vista
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Carga inicial de todas las variantes sin filtros
   */
  getAllVariants(): void {
    this.searchService
      .getAllVariants(this.lastId, this.pageSize)
      .subscribe({
        next: (response: VariantResponse) => {
          this.dataSource.data = response.variants; // Actualizar datos de la tabla
          this.totalDocuments = response.total_documents; // Total de documentos
          this.lastId = response.last_id || null; // Actualizar el último ID
          this.displayedColumns = this.getDynamicColumns(response.variants); // Configurar columnas dinámicas
          this.dataSource.sort = this.sort; // Asegurar que MatSort esté vinculado
        },
        error: (error) => {
          console.error('Error fetching all variants:', error);
        },
      });
  }

  /**
   * Genera columnas dinámicamente según las claves de los datos
   */
  getDynamicColumns(data: Variant[]): string[] {
    return Array.from(
      data.reduce((columns, item) => {
        Object.keys(item).forEach((key) => {
          if (key !== '_id') columns.add(key); // Excluir claves no deseadas
        });
        return columns;
      }, new Set<string>())
    );
  }

  /**
   * Maneja la lógica para aplicar filtros de búsqueda
   */
  applyFilter(): void {
    console.log('Filtros aplicados:', {
      selectedColumn: this.selectedColumn,
      searchValue: this.searchValue,
    });

    this.selectedColumn = this.selectedColumn.trim();
    this.searchValue = this.searchValue.trim();

    if (!this.selectedColumn || !this.searchValue) {
      console.error('Debes seleccionar una columna y escribir un valor para buscar.');
      return;
    }

    // Reiniciar lógica de paginación y cargar datos filtrados
    this.lastId = null;
    this.paginator.firstPage();
    this.getBulkVariants();
  }

  /**
   * Obtiene datos filtrados según los parámetros seleccionados
   */
  getBulkVariants(): void {
    this.searchService
      .getBulkVariants(this.selectedColumn, this.searchValue, this.lastId, this.pageSize)
      .subscribe({
        next: (response: VariantResponse) => {
          console.log('Bulk variants response:', response);
          this.dataSource.data = response.variants; // Actualizar datos de la tabla
          this.totalDocuments = response.total_documents; // Actualizar el total
          this.lastId = response.last_id || null; // Actualizar el último ID
          this.displayedColumns = this.getDynamicColumns(response.variants); // Configurar columnas dinámicas
          this.dataSource.sort = this.sort; // Asegurar que MatSort esté vinculado
        },
        error: (error) => {
          console.error('Error fetching bulk variants:', error);
        },
      });
  }

  /**
   * Maneja los cambios en el paginador
   */
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize; // Actualizar tamaño de página
    if (event.pageIndex === 0) {
      this.lastId = null; // Reiniciar paginación si es la primera página
    }

    // Decidir si se usa búsqueda filtrada o datos generales
    if (this.selectedColumn && this.searchValue) {
      this.getBulkVariants();
    } else {
      this.getAllVariants();
    }
  }

  /**
   * Configuración personalizada para ordenamiento de datos
   */
  configureSorting(): void {
    this.dataSource.sortingDataAccessor = (item: VariantSort, property) => {
      // Acceso personalizado a los datos para la ordenación
      return typeof item[property] === 'string'
        ? item[property].toLowerCase() // Comparar valores en minúsculas
        : item[property];
    };
  }

  /**
   * Métodos para manejar acciones del menú de usuario
   */
  viewProfile(): void {
    console.log('Abrir perfil...');
    // Agregar lógica para abrir el perfil del usuario
  }

  viewSettings(): void {
    console.log('Abrir configuración...');
    // Agregar lógica para abrir las configuraciones del usuario
  }

  logout(): void {
    console.log('Cerrar sesión...');
    // Agregar lógica para cerrar sesión
  }
}
