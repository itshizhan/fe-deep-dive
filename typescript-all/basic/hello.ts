// function sayHello(person: string) {
//   return 'Hello, ' + person;
// }

// let user = 'tome';
// console.log(sayHello(user));

// let isDone: boolean = true;
// let createByNewBoolean:boolean = new Boolean(1);//no
// let createByNewBoolean:Boolean = new Boolean(1); //ok

// function alertName(): void {
//   console.log("no return");
// }

// let n:null = null;
// let u:undefined = undefined;


// 这样也不会报错
// let u: undefined;
// let num: number = u;
// let n:any =  void; //no

// let anyName: any = 'name';
// console.log(anyName.anyprop); //ok


// let myFavoriteNumber = 'seven';
// myFavoriteNumber = 4; //类型推断：不能将类型“4”分配给类型“string”。

// 联合类型

// let utype:string|number = 7;
// utype = 'hello world';


// function getLength(something: string | number): string {
//   return something.toString();
// }


// let myFavoriteNumber: string | number;
// myFavoriteNumber = 'seven';
// console.log(myFavoriteNumber.length); // 5
// myFavoriteNumber = 7;
// console.log(myFavoriteNumber.length); // 编译时报错

// 接口
// interface IPerson {
//   readonly id:string;
//   name: string;
//   age?: number;
//   [propName:string]:string|undefined|number;
// }

// let tom: IPerson = {
//   id:'22323',
//   name:'tome',
//   age:20,
//   hi:'hi',
//   s:'22'
// }
// tom.age = '33'; //no
// tom.age = 30;
// tom.id = '222'; // no it's readonly

// 数组
// let arr1: number[] = [1,2];
// let arr2: Array<string> = ['1,2,3'];

// interface INumberArray {
//   [index:number]:string;
// }
// let arr3: INumberArray = ['1,2,3'];

// let arr4: any = [1,'2',{a:1}];


// function sum() {
//   let args: number[] = arguments;
// }

// Array.from()


// let arr5:any[] = Array.of(3, 11, 8);
// console.log(arr5);

// function a():void{
//   let args:IArguments = arguments;
// }

// 函数

// function sum(x: number, y: number): string {
//   return x + y + '';
// }
// sum(1, 2, 3); //no

// sum(2,2)

// let mySum = function (x: number, y: number): number {
//   return x + y;
// };
// mySum(1,2);

// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
// let mySum:(x:number,y:number)=>number = function (x: number, y: number): number {
//   return x + y;
// };

// mySum(2,2);

// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string):boolean {
//   return source.search(subString) !== -1;
// }

// function buildName(firstName: string, lastName: string = 'Cat') {
//   return firstName + ' ' + lastName;
// }
// let tomcat = buildName('Tom', 'Cat');
// let tom = buildName('Tom');


// function push(array: any[], ...items: any[]) {
//   items.forEach(function(item) {
//       array.push(item);
//   });
// }

// let a:any[] = [];
// push(a, 1, 2, 3);

// function reverse(x: number): number;
// function reverse(x: string): string;
// function reverse(x: number | string): number | string {
//     if (typeof x === 'number') {
//         return Number(x.toString().split('').reverse().join(''));
//     } else if(typeof x === 'string') {
//         return x.split('').reverse().join('');
//     }else {
//       return ''
//     }
// }

// type

// function getLength(something: string | number): number {
//   if ((<string>something).length) {
//       return (something as string).length;
//   } else {
//       return something.toString().length;
//   }
// }

//  内置对象
// let d: Date = new Date();

// Math.pow(10, 2);

// let arrayLike = {
//   0: 'tom', 
//   1: '65',
//   2: '男',
//   3: ['jane','john','Mary'],
//   'length': 4
// }

// Array.from(arrayLike);

// 声明文件

// var str:string = 'hello world';
// function fn(a:string):string {
//   return a
// }
// let fn:(a:string)=>string = function(a:string):string{
//   return a;
// };
// fn('hello');
// declare var $: (selector: string) => any;
// $('#foo');


// 类型声明
// declare class Animal {
//   name: string;
//   constructor(name: string);
//   sayHi(): string;
// }

// let cat = new Animal('Tom');

// cat.sayHi()
// class Animal{
//   constructor(name:string){

//   }
// }
// let cat = new Animal('Tom');
// declare enum Directions {
//   Up,
//   Down,
//   Left,
//   Right
// }

// let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// import { name, getName, Animal, Directions, Options } from 'foo';

// console.log(name);
// let myName = getName();
// let cat = new Animal('Tom');
// let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// let options: Options = {
//     data: {
//         name: 'foo'
//     }
// };
// type Name = string;
// type NameResolver = () => string;
// type NameOrResolver = Name | NameResolver;
// function getName(n: NameOrResolver): Name {
//     if (typeof n === 'string') {
//         return n;
//     } else {
//         return n();
//     }
// }

// getName(function(){ return ''})

// type EventNames = 'click' | 'scroll' | 'mousemove';
// function handleEvent(ele: HTMLElement|null, event: EventNames) {
//     // do something
// }

// handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
// handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'

// tupe 元祖
// let xcatliu: [string, number]= ['tom',25];
// xcatliu[0] = 'Xcat Liu';
// xcatliu[1] = 25;

// xcatliu[0].slice(1);
// xcatliu[1].toFixed(2);

// let xcatliu: [string, number];
// xcatliu = ['Xcat Liu',22];

// let xcatliu: [string, number];
// xcatliu = ['Xcat Liu',22];
// xcatliu[1] = 25;

// let xcatliu: [string, number];
// xcatliu = ['Xcat Liu', 25];
// xcatliu.push('http://xcatliu.com/');
// xcatliu.push(1);


// enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
// Days[0]

// enum Color {Red, Green, Blue = "blue".length,Grey=5};

// class 类

// class Animal {
//     constructor(name:string) {
//         this.name1 = name;
//     }
//     get name1() {
//         return 'Jack';
//     }
//     set name1(value) {
//         console.log('setter: ' + value);
//     }
// }

// let a = new Animal('Kitty'); // setter: Kitty
// a.name1 = 'Tom'; // setter: Tom
// console.log(a.name1); // Jack

// class Point {
//     x:number =  10;
//     y:number = 10;

// }