import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../../core/service/products.service';
import {ProductsFilter} from '../../../shared/model/products-filter.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../shared/model/product.model';
import {DepartmentsService} from '../../../core/service/departments.service';
import {Department} from '../../../shared/model/department.model';
import {Category} from '../../../shared/model/category.model';
import {Subscription} from 'rxjs';
import {Cloner} from '../../../core/helper/cloner';

export enum DisplayType {
  GRID, List
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {
  isLoadingPage = false;
  isLoadingProducts = false;
  displayType: DisplayType = DisplayType.GRID;
  filters: ProductsFilter;
  products: Product[] = [];
  department: Department = undefined;
  subscriptions: Subscription[] = [];
  filtersInitialised = false;
  constructor(private productsService: ProductsService,
              private departmentsService: DepartmentsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.filters = new ProductsFilter();
    this.initDepartment();
  }

  private initFilters(): void {
    this.filtersInitialised = true;
    const sub = this.activatedRoute.queryParamMap.subscribe(value => {
      console.log('filters changed');
      this.filters.page = !!value.get('page') ? Number(value.get('page')) : undefined;
      this.filters.size = !!value.get('size') ? Number(value.get('size')) : undefined;
      this.filters.min = !!value.get('min') ? Number(value.get('min')) : undefined;
      this.filters.max = !!value.get('max') ? Number(value.get('max')) : undefined;
      this.filters.sortBy = !!value.get('sortBy') ? value.get('sortBy') : 'id';
      this.filters.order = !!value.get('order') ? value.get('order') : 'ASC';
      this.filters.condition = value.get('condition');
      this.filters.cId = value.get('cId');
      this.loadProducts();
    });
    this.subscriptions.push(sub);
  }

  loadProducts(): void {
    this.isLoadingProducts = true;
    this.filters.size = 10;
    this.products = [];
    const sub = this.productsService.getAllProducts(this.filters).subscribe(value => {
      this.products = value;
      this.isLoadingProducts = false;
      this.isLoadingPage = false;
    });
    this.subscriptions.push(sub);
  }

  ngOnInit(): void {
  }

  changeDisplayList(displayType: DisplayType): void {
    if (displayType !== this.displayType) {
      this.displayType = displayType;
    }
  }

  private initDepartment(): void {
    this.activatedRoute.paramMap.subscribe(value => {
      console.log('department changed');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.subscriptions.length; i++) {
        this.subscriptions[i].unsubscribe();
      }
      const departmentName = value.get('department');
      this.isLoadingPage = true;
      this.products = [];
      this.departmentsService.getDepartmentByName(departmentName).subscribe(d => {
        this.department = d;
        this.filters.dId = this.department.id;
        this.initFilters();
      });
    });
  }

  changeCategory(category: Category): void {
    this.filters.cId = category.id;
    this.changeQueryParams();
  }

  changeQueryParams(): void {
    const filters = this.filters;
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {...Cloner.cloneObject(filters), dId: null},
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }).then();
  }

  clearCategory(): void {
    this.filters.cId = null;
    this.changeQueryParams();
  }

  ngOnDestroy(): void {
  }

  changeSort($event: Event): void {
    this.changeQueryParams();
  }

}
