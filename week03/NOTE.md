## 表达式

### 语法Grammar
  1. Tree vs Priority
    表达式生成树实现的
    程序使用者而言： 运算符的优先级
    语言实现而言： 运算法的树的结构

  2. **优先级最高的两个运算符 Member（成员访问运算符） 和 New运算符**
    member：
      - a.b
      - a[b] 
        - // b是一个变量，覆盖了java的反射 js是动态的
      - foo`string`
        - 方便自己写子语法
      - super.b
      - super['b']
          - 可以当作一个变量用，切只能在构造函数里面用  
          - 调用父类的属性
        - ```js
        - class
        - ````
      - new.target
        - 可以判断一个函数是否被new吊起，官方的class关键字声明的类型使用这个new.target
        - 函数不知道自己是new调还是普通方法调
        - 库涉及规范化，会写些防御代码
      - new Foo()
    New
      new Foo 没有 new Foo()优先级高
      出于严谨的语法考虑
      ```js
        new a()()
        new new a()
      ```
**成员表达式返回的是一个Reference类型**
既能读又能写的参数，
有写的能力 delete assign 体现出引用的特性
3 **其次就是call表达式**
foo()
super()
f00()['b']
foo().b

4. **left Hand and right**
   1. left hand 包含 member new call表达式 左结合 这些表达式只能在左边加表达式

5. right*
   1. update (不允许有换行 no lineTerminator here)
      1. a++ 
      2. a--
      3. ++a
      4. --a

  ```js
    let a = 1, b = 1, c=1;
    a
    ++
    b
    ++
    c
    // 这些代码是b, c自增了 因为语法里++的时候这里不允许右结合之间有换行符
  ```
  2. Unary 单目运算符

    - delete a.b
    - void foo()
    - tyoeof a
      - typeof function() {} 返回 function
      - typeof null 返回 object
      - js没有一个完美的判断一个值得类型
    - +a
    - -a
    - ~a
    - !a
    - await a

    立即执行函数表达式
    只要是这个能够将一个函数表示成一个函数表达式，就可以立即调用 
    void function(i) {}(i)推荐使用viod 用括号忘记写分号，有工具将你代码h'ge'
  6. 乘法 加法 位运算 移位运算 关系比较 大于等于 instanceof in
  7. 等号
  8. bitwise
     1. & 
  9.  logical
     2.  && ||
  10. 三元运算也会短路 和if else 一样 推荐使用
  11. ，逗号优先级最低
### type Convertion

### Boxing 和 
```js
  Number String Symbol Boolean
  new Number(1)
  new String('999')
  // 这样就包装一个对象
```
推荐不要用自动转化，增加代码可读性
Symbol不能new，可以直接调
通过object装箱
Symbol有构造器

### 拆箱
最先使用 Symbol.toPrimitive  Symbol.toPrimitive 有这个直接接管 优先使用valueOf的值 如果没有valueOf 则使用toString

### Exercise
StringToNumber
parseFloat()
Number
1231
1. 考虑进制问题
2. 小数和乘方的问题
3. 
NumberToString