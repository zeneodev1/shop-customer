export class Product {
  public id: string | undefined;
  public title: string | undefined;
  public description: string | undefined;
  public departmentId: string | undefined;
  public categoryId: string | undefined;
  public quantity: string | undefined;
  public images: string[] = [];
  public price: number | undefined;
  public costPerItem: number | undefined;
  public chargeTaxes: boolean | undefined;
  public condition: boolean | undefined;
  public tags: string[] = [];
  public status: string | undefined;
  shortCut: string | undefined;
}
