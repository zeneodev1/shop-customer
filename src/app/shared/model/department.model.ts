import {Category} from './category.model';

export class Department {

  public id: string | undefined;
  public name: string | undefined;
  public description: string | undefined;
  public categories: Category[] | undefined;
  public tags: string[] | undefined;
  public images: string[] | undefined;
  public productCount: number | undefined;
  public shortCut: number | undefined;
}
