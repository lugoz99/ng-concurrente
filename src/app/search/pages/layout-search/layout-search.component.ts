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

  // Información de paginación
  totalDocuments = 0;
  pageSize = 1000;
  lastId: string | null = null; // Último ID recuperado

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private variantService: SearchService) { }

  ngOnInit() {
    this.fetchVariants();
  }

  fetchVariants(): void {
    // Llama al servicio con los parámetros de paginación
    this.variantService.getAllVariants(this.lastId, this.pageSize).subscribe({
      next: (response: VariantResponse) => {
        this.dataSource.data = response.variants; // Carga las variantes en la tabla
        this.displayedColumns = this.getDynamicColumns(response.variants); // Genera las columnas dinámicas
        this.totalDocuments = response.total_documents; // Total de documentos
        this.lastId = response.last_id; // Último ID para la siguiente página
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  getDynamicColumns(data: Variant[]): string[] {
    // Genera las columnas dinámicas y excluye '_id'
    return Array.from(
      data.reduce((columns, item) => {
        Object.keys(item).forEach((key) => {
          if (key !== '_id') {
            columns.add(key); // Solo agrega claves que no sean '_id'
          }
        });
        return columns;
      }, new Set<string>())
    );
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }

  onPageChange(event: PageEvent): void {
    // Actualiza el tamaño de la página
    this.pageSize = event.pageSize;

    // Reinicia la paginación si el usuario cambia el tamaño de página
    if (event.pageIndex === 0) {
      this.lastId = null;
    }

    this.fetchVariants(); // Solicita la nueva página al backend
  }

  viewProfile() {
    console.log('Abrir perfil...');
    // Lógica para abrir el perfil
  }

  viewSettings() {
    console.log('Abrir configuración...');
    // Lógica para abrir configuración
  }

  logout() {
    console.log('Cerrar sesión...');
    // Lógica para cerrar sesión
  }
}
