import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-button-component',
  template: `
    <button 
      *ngIf="!isEditing" 
      class="btn btn-sm btn-outline-secondary me-2" 
      (click)="startEdit()">
      Modifier
    </button>
    <button 
      *ngIf="isEditing" 
      class="btn btn-sm btn-success me-2" 
      (click)="saveEdit()">
      Sauvegarder
    </button>
    <button 
      *ngIf="isEditing" 
      class="btn btn-sm btn-secondary me-2" 
      (click)="cancelEdit()">
      Annuler
    </button>
  `,
})
export class UpdateButtonComponentComponent {
  @Input() isEditing: boolean = false;
  @Output() edit = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  startEdit() {
    this.edit.emit();
  }

  saveEdit() {
    this.save.emit();
  }

  cancelEdit() {
    this.cancel.emit();
  }


}
