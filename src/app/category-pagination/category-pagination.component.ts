import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../services/category.service';

@Component({
  selector: 'app-category-pagination',
  templateUrl: './category-pagination.component.html',
  styleUrls: ['./category-pagination.component.css'],
})
export class CategoryPaginationComponent implements OnInit {
  paginatedCategories: Category[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void {
    this.categoryService.getPaginatedCategories(this.currentPage, 10).subscribe((data) => {
      this.paginatedCategories = data.content;
      this.totalPages = data.totalPages;
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadPage();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPage();
    }
  }
}
