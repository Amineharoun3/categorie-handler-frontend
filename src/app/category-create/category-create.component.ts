import { Component } from '@angular/core';
import { CategoryService, Category } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  categories: Category[] = [];
  newCategory: Category = { id: null, name: '', parentCategory: null, createdDate: new Date() };

  constructor(private categoryService: CategoryService) {}

  addCategory(): void {
    if (!this.newCategory.name) {
      alert("Le nom de la catégorie est obligatoire.");
      return;
    }

    if (!this.newCategory.createdDate) {
      this.newCategory.createdDate = new Date(); // Assurez-vous que la date est bien définie
    }
  
    if (this.newCategory.parentCategory && typeof this.newCategory.parentCategory === 'object') {
      const parentCategoryId = this.newCategory.parentCategory.id;
      this.newCategory.parentCategory = { id: parentCategoryId, name: '', parentCategory: null, createdDate: new Date() };
    }
  
    this.categoryService.createCategory(this.newCategory).subscribe(
      (createdCategory: Category) => {
        console.log('Catégorie créée avec succès :', createdCategory);
        this.resetForm();
      },
      (error) => console.error('Erreur lors de la création de la catégorie', error)
    );
  }
  
  


  resetForm(): void {
    this.newCategory = { id: null, name: '', parentCategory: null, createdDate: new Date() };
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories: Category[]) => this.categories = categories,
      (error) => console.error('Erreur lors du chargement des catégories', error)
    );
  }

  loadCategory(id: number): void {
    this.categoryService.getCategoryById(id).subscribe(
      (category: Category) => {
        console.log('Catégorie récupérée:', category);
        // Vous pouvez utiliser cette catégorie pour pré-remplir un formulaire ou autre
      },
      (error) => console.error('Erreur lors de la récupération de la catégorie', error)
    );
  }
}
