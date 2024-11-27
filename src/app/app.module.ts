import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './components/category-list/category-list.component'; // Import du composant
import { FormsModule } from '@angular/forms';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { DeleteButtonComponentComponent } from './delete-button-component/delete-button-component.component';
import { UpdateButtonComponentComponent } from './update-button-component/update-button-component.component';
import { CategoryPaginationComponent } from './category-pagination/category-pagination.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    DeleteButtonComponentComponent,
    UpdateButtonComponentComponent,
    CategoryPaginationComponent,
    CategoryFilterComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
