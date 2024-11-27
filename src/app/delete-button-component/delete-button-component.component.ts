import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button-component',
  template: `
    <button class="btn btn-sm btn-outline-danger" (click)="onDelete()">
      Supprimer
    </button>
  `,
})
export class DeleteButtonComponentComponent {
  @Input() categoryId: number = 0;
  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.categoryId);
  }
}
