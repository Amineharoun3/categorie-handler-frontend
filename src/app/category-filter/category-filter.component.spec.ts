import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent {
  filteredCategories = [];
  isRoot: boolean | null = null;
  afterDate: string | null = null;
  beforeDate: string | null = null;

  constructor(private categoryService: CategoryService) {}

  applyFilters() {
    this.categoryService.filterCategories(true, '2024-01-01', '2024-12-31').subscribe(categories => {
      console.log(categories);
    });
    
  }
}
