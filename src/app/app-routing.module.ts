import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';

import { CategoryListComponent } from './components/category-list/category-list.component';
const routes: Routes = [
  { path: 'categories', component: CategoryListComponent },
 // { path: 'categories/update/:id', component: CategoryUpdateComponent },
 { path: 'category/:id', component: CategoryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
