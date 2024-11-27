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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
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
}
