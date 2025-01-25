import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Category {
  id: number | null;
  name: string;
  parentCategory: Category | null;
  createdDate: Date; // Uniquement `Date`
  children?: Category[];
  rootCategory?: Category | null;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`).pipe(
      map(categories =>
        categories.map(category => ({
          ...category,
          createdDate: new Date(category.createdDate),
        }))
      )
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`).pipe(
      map(category => ({
        ...category,
        createdDate: new Date(category.createdDate),
      }))
    );
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
  return this.http.get<Category[]>(`${this.baseUrl}/with-children`).pipe(
    map(categories =>
      categories.map(category => ({
        ...category,
        createdDate: new Date(category.createdDate),
        rootCategory: category.rootCategory ?? null, // Garantit que `null` est utilisé si non défini
      }))
    )
  );
}


  
  filterCategories(
    isRoot?: boolean,
    afterDate?: string,
    beforeDate?: string
  ): Observable<Category[]> {
    const params: any = {};
    if (isRoot !== undefined) params.isRoot = isRoot;
    if (afterDate) params.afterDate = afterDate;
    if (beforeDate) params.beforeDate = beforeDate;

    return this.http.get<Category[]>(`${this.baseUrl}/categories/filter`, {
      params,
    }).pipe(
      map(categories =>
        categories.map(category => ({
          ...category,
          createdDate: new Date(category.createdDate ),
        }))
      )
    );
  }

  getPaginatedCategories(page: number = 0, size: number = 10): Observable<{ content: Category[]; totalPages: number }> {
    return this.http.get<{ content: Category[]; totalPages: number }>(`${this.baseUrl}/categories`, {
      params: { page: page.toString(), size: size.toString() },
    }).pipe(
      map(response => ({
        ...response,
        content: response.content.map(category => ({
          ...category,
          createdDate: new Date(category.createdDate), // Conversion des dates en format `Date`
        })),
      }))
    );
  }
  
  searchCategories(
    name: string | null,
    isRoot: boolean | null,
    afterDate: string | null,
    beforeDate: string | null,
    page: number = 0,
    size: number = 10
  ): Observable<{ content: Category[]; totalPages: number }> {
    const params: any = { page, size };
  
    if (name) params.name = name;
    if (isRoot !== null) params.isRoot = isRoot;
    if (afterDate) params.afterDate = afterDate;
    if (beforeDate) params.beforeDate = beforeDate;
  
    return this.http.get<{ content: Category[]; totalPages: number }>(`${this.baseUrl}/search`, { params }).pipe(
      map(response => ({
        ...response,
        content: response.content.map(category => ({
          ...category,
          createdDate: new Date(category.createdDate), // Convertir la date
        })),
      }))
    );
  }
  
  
}
