import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Categorie_handler';

    // Ajoutez cette méthode
    isCreateFormVisible: boolean = false;

    showCreateCategoryForm() {
      this.isCreateFormVisible = true;
    }
  
    hideCreateCategoryForm() {
      this.isCreateFormVisible = false;
    }
}
