import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Category {
  id: number | null;
  name: string;
  parentCategory: Category | null;
  createdDate: Date | String;
  children?: Category[];
}





@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}`, category);
  }
  
  

  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
  }
  

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllCategoriesWithChildren(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/with-children`);
  }
  

  filterCategories(isRoot?: boolean, afterDate?: string, beforeDate?: string): Observable<Category[]> {
    const params: any = {};
    if (isRoot !== undefined) params.isRoot = isRoot; // Vérifie qu'il n'est pas `null`
    if (afterDate) params.afterDate = afterDate;
    if (beforeDate) params.beforeDate = beforeDate;
  
    return this.http.get<Category[]>(`${this.baseUrl}/categories/filter`, { params });
  }
  

  getPaginatedCategories(page: number = 0, size: number = 10): Observable<{ content: Category[]; totalPages: number }> {
    return this.http.get<{ content: Category[]; totalPages: number }>(`${this.baseUrl}`, {
      params: { page: page.toString(), size: size.toString() },
    });
  }
  

  
}
