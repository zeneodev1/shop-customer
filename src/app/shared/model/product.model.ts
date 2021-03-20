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
  public information: any | undefined;
  public status: string | undefined;
  public shortCut: string | undefined;
  public productDescription: {
    content: string
  };
}
