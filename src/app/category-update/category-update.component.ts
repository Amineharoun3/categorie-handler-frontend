/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService, Category } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  category: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategoryById(id).subscribe(
        (data: Category) => {
            this.category = data;
        },
        (error) => console.error('Erreur lors du chargement de la catégorie', error)
    );
}


  updateCategory(): void {
    if (this.category && this.category.id !== null) {
      this.categoryService.updateCategory(this.category.id, this.category).subscribe(
        (updatedCategory: Category) => {
          console.log('Catégorie mise à jour avec succès:', updatedCategory);
          this.router.navigate(['/categories']); // Redirigez vers la liste des catégories après la mise à jour
        },
        (error) => console.error('Erreur lors de la mise à jour de la catégorie', error)
      );
    }
  }
}
 */