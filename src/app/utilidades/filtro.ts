import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class Filtro {
  filterByName(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => item.nombre.toLowerCase().includes(searchText));
  }
}
