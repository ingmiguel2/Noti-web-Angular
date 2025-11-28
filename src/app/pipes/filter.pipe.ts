import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'categoryFilter',
    standalone: true
})
export class FilterPipe implements PipeTransform{
transform(items: any[], searchText: string, propertyName?: string): any[] { 
        if (!items || !searchText) { 
          return items; 
        } 
        searchText = searchText.toLowerCase(); 
 
        if (propertyName) { 
          return items.filter(item => 
            item[propertyName].toLowerCase().includes(searchText) 
          ); 
        } else { 
          // Filter across all properties if no propertyName is provided 
          return items.filter(item => 
            Object.values(item).some(value => 
              String(value).toLowerCase().includes(searchText) 
            ) 
          ); 
        } 
      } 
}