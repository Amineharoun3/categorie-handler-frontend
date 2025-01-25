import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  category!: Category; // Informations sur la catégorie
  loading: boolean = true; // Indicateur de chargement

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    // Récupère l'ID depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.getCategoryById(+id).subscribe(
        (data) => {
          this.category = data;
          this.loading = false;
        },
        (error) => {
          console.error('Erreur lors du chargement de la catégorie', error);
          this.loading = false;
        }
      );
    }
  }
}
