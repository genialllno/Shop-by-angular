import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { IProducts } from '../models/products';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProducts> {

  constructor(private ProductsService: ProductsService, private roter: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> {
    return this.ProductsService.getProduct(route.params?.['id']).pipe(
      catchError( () => {
        this.roter.navigate(['products'])
        return EMPTY
      })
    )
  }
}
