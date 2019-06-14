console.log("hello ts");

// class Animal {
//   name = 'Jack';
//   static num = 42;
//   private p = 'privite';
// }


// let a = new Animal();
// console.log(a.name); // Jack
// console.log(Animal.num);
// console.log(a.p); // private

// abstract class Animal {
//   protected name:string;
//   constructor(name:string) {
//       this.name = name;
//   }
// }

// class Cat extends Animal {
//   constructor(name:string) {
//       super(name);
//       console.log(this.name);
//   }
// }

// let a = new Cat('s');


// class Animal {
//   name: string;
//   constructor(name: string) {
//       this.name = name;
//   }
//   sayHi(): string {
//     return `My name is ${this.name}`;
//   }
// }

// let a: Animal = new Animal('Jack');
// console.log(a.sayHi()); // My name is Jack

// interface Alarm {
//   alert():void;
// }

// class Door {

// }
// interface Light {
//   lightOn():string;
// }

// class SecurityDoor extends Door implements Alarm {
//   alert() {
//       console.log('SecurityDoor alert');
//   }
// }

// class Car implements Alarm,Light {
//   alert() {
//       console.log('Car alert');
//   }
//   lightOn(){
//     return 'lightOn';
//   }
// }

// let sd = new SecurityDoor();
// let car = new Car();
// sd.alert();
// car.alert();

// console.log(car.lightOn());

// class Point {
//   x: number | undefined;;
//   y: number | undefined;;
// }

// interface Point3d extends Point {
//   z: number;
// }

// let point3d: Point3d = {x: 1, y: 2, z: 3};

// generics 泛型

// function createArray<T>(length: number, value: T): Array<T> {
//   let result:T[] = [];
//   for (let i = 0; i < length; i++) {
//       result[i] = value;
//   }
//   return result;
// }

// let ret = createArray(3, 2); 
// console.log(ret);

// function loggingIdentity<T extends string>(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }
// loggingIdentity('xxx')


// interface CreateArrayFunc {
//   <T>(length: number, value: T): Array<T>;
// }

// let createArray: CreateArrayFunc;
// createArray = function<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for (let i = 0; i < length; i++) {
//       result[i] = value;
//   }
//   return result;
// }

// createArray(3, 'x'); // ['x', 'x', 'x']

// interface CreateArrayFunc<T> {
//   (length: number, value: T): Array<T>;
// }

// let createArray: CreateArrayFunc<any>;
// createArray = function<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for (let i = 0; i < length; i++) {
//       result[i] = value;
//   }
//   return result;
// }

// createArray(3, 'x'); // ['x', 'x', 'x']

interface Alarm {
  price: number;
}
interface Alarm {
  price: number;  // 类型不一致，会报错
  weight: number;
}