import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  editCategory: Category | null = null;
  currentPage: number = 1;
itemsPerPage: number = 10;
totalPages: number = 0;

name: string | null = null;
isRoot: boolean | null = null;
afterDate: string | null = null;
beforeDate: string | null = null;


  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadPaginatedCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => console.error('Erreur lors du chargement des catégories', error)
    );
  }

  startEdit(category: Category): void {
    this.editCategory = { ...category }; // Crée une copie pour l'édition
  }

  updateCategory(): void {
    if (this.editCategory && this.editCategory.id !== null) {
      const categoryToUpdate = {
        ...this.editCategory,
        parentCategory: this.editCategory.parentCategory || null // Forcer null si aucun parent
      };
  
      this.categoryService.updateCategory(this.editCategory.id, categoryToUpdate).subscribe(
        () => {
          this.loadCategories(); // Recharge les catégories après mise à jour
          this.cancelEdit();
        },
        (error) => console.error('Erreur lors de la mise à jour de la catégorie', error)
      );
    }
  }
  
  
  

  
  getRootCategories(): Category[] {
    return this.categories.filter(category => !category.parentCategory);
  }
  
  deleteCategory(id: number | null): void {
    if (id !== null) {
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          this.categories = this.categories.filter(c => c.id !== id); // Supprime la catégorie de la liste
        },
        (error) => console.error('Erreur lors de la suppression de la catégorie', error)
      );
    }
  }

  cancelEdit(): void {
    this.editCategory = null; // Annule l'édition
  }

  loadPaginatedCategories(): void {
    this.categoryService.getPaginatedCategories(this.currentPage - 1, this.itemsPerPage).subscribe(
      (response) => {
        console.log('Données reçues du backend :', response);
        this.categories = response.content || []; // Garantir un tableau vide si content est vide
        this.totalPages = response.totalPages || 1;
      },
      (error) => console.error('Erreur lors du chargement des catégories paginées', error)
    );
  }
  
  
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPaginatedCategories();
    }
  }

  
  
  applyFilters(): void {
    this.categoryService.searchCategories(this.name, this.isRoot, this.afterDate, this.beforeDate, this.currentPage - 1, this.itemsPerPage)
      .subscribe(
        (response) => {
          this.categories = response.content;
          this.totalPages = response.totalPages;
        },
        (error) => console.error('Erreur lors de la recherche des catégories', error)
      );
  
}
}
