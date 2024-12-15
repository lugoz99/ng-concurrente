import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutSearchComponent } from './pages/layout-search/layout-search.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutSearchComponent,
    // children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
