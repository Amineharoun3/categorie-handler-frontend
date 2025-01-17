import { Component } from '@angular/core';
import { CategoryService, Category } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent {
  isRoot: boolean = false; // Filtrer uniquement les catégories racines
  afterDate: string | null = null; // Filtrer les catégories créées après cette date
  beforeDate: string | null = null; // Filtrer les catégories créées avant cette date
  filteredCategories: Category[] = []; // Liste des catégories filtrées

  constructor(private categoryService: CategoryService) {}

  // Méthode pour appliquer les filtres
  applyFilters(): void {
    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      this.filteredCategories = categories.filter((category) => {
        const createdDate = typeof category.createdDate === 'string' || typeof category.createdDate === 'number'
          ? new Date(category.createdDate)
          : null;
  
        // Vérifier si `createdDate` est null
        if (!createdDate) {
          return false; // Exclure les catégories sans date valide
        }
  
        // Filtrer par catégories racines
        if (this.isRoot && category.parentCategory !== null) {
          return false;
        }
  
        // Filtrer par date "après"
        if (this.afterDate && createdDate < new Date(this.afterDate)) {
          return false;
        }
  
        // Filtrer par date "avant"
        if (this.beforeDate && createdDate > new Date(this.beforeDate)) {
          return false;
        }
  
        return true;
      });
    });
  }
  
}
