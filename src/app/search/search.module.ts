import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { LayoutSearchComponent } from './pages/layout-search/layout-search.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutSearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    LayoutSearchComponent
  ]
})
export class SearchModule { }
