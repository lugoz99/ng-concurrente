import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-layout-search',
  templateUrl: './layout-search.component.html',
  styleUrls: ['./layout-search.component.css']
})
export class LayoutSearchComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // Variables para búsqueda
  selectedColumn = ''; // Columna seleccionada
  searchValue = ''; // Valor a buscar

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // Personaliza el filtro para una columna específica
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      const searchColumn = this.selectedColumn; // Columna seleccionada
      const filterValue = filter.trim().toLowerCase();

      if (!searchColumn || !filterValue) {
        return true; // Si no hay filtro o columna seleccionada, muestra todo
      }

      const cellValue = (data as any)[searchColumn]?.toString().toLowerCase();
      return cellValue?.includes(filterValue);
    };
  }

  // Ejecuta el filtro al presionar Enter o hacer clic
  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  { position: 21, name: 'Scandium', weight: 44.9559, symbol: 'Sc' },
  { position: 22, name: 'Titanium', weight: 47.867, symbol: 'Ti' },
  { position: 23, name: 'Vanadium', weight: 50.9415, symbol: 'V' },
  { position: 24, name: 'Chromium', weight: 51.9961, symbol: 'Cr' },
  { position: 25, name: 'Manganese', weight: 54.938, symbol: 'Mn' },
  { position: 26, name: 'Iron', weight: 55.845, symbol: 'Fe' },
  { position: 27, name: 'Cobalt', weight: 58.9332, symbol: 'Co' },
  { position: 28, name: 'Nickel', weight: 58.6934, symbol: 'Ni' },
  { position: 29, name: 'Copper', weight: 63.546, symbol: 'Cu' },
  { position: 30, name: 'Zinc', weight: 65.38, symbol: 'Zn' },
  { position: 31, name: 'Gallium', weight: 69.723, symbol: 'Ga' },
  { position: 32, name: 'Germanium', weight: 72.63, symbol: 'Ge' },
  { position: 33, name: 'Arsenic', weight: 74.9216, symbol: 'As' },
  { position: 34, name: 'Selenium', weight: 78.96, symbol: 'Se' },
  { position: 35, name: 'Bromine', weight: 79.904, symbol: 'Br' },
  { position: 36, name: 'Krypton', weight: 83.798, symbol: 'Kr' },
  { position: 37, name: 'Rubidium', weight: 85.4678, symbol: 'Rb' },
  { position: 38, name: 'Strontium', weight: 87.62, symbol: 'Sr' },
  { position: 39, name: 'Yttrium', weight: 88.9059, symbol: 'Y' },
  { position: 40, name: 'Zirconium', weight: 91.224, symbol: 'Zr' },
  { position: 41, name: 'Niobium', weight: 92.9064, symbol: 'Nb' },
  { position: 42, name: 'Molybdenum', weight: 95.95, symbol: 'Mo' },
  { position: 43, name: 'Technetium', weight: 98, symbol: 'Tc' },
  { position: 44, name: 'Ruthenium', weight: 101.07, symbol: 'Ru' },
  { position: 45, name: 'Rhodium', weight: 102.905, symbol: 'Rh' },
  { position: 46, name: 'Palladium', weight: 106.42, symbol: 'Pd' },
  { position: 47, name: 'Silver', weight: 107.868, symbol: 'Ag' },
  { position: 48, name: 'Cadmium', weight: 112.414, symbol: 'Cd' },
  { position: 49, name: 'Indium', weight: 114.818, symbol: 'In' },
  { position: 50, name: 'Tin', weight: 118.71, symbol: 'Sn' }
];
