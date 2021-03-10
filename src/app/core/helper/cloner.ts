
export class Cloner {
  static cloneObject<T>(ob: T): T {
    return Object.assign<object, T>({}, ob);
  }

  static cloneArray<T>(ar: T[]): T[] {
    const c: T[] = [];
    ar.forEach(value => {
      c.push(Object.assign({}, value));
    });
    return c;
  }
}
