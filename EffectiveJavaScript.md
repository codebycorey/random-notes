[Back to home](./README.md)

## Chapter 1 Accustoming Yourself to JavaScript
#### Item 1: Know Which JavaScript you are using
* Decide which versions of JavaScript your application supports.
* Be sure that any JavaScript features you use are supported by all environments where your application runs.
* Always test strict code in environments that perform the strict-mode checks.
* Beware of concatenating scripts that differ in their expectations about strict mode.

#### Item 2: Understand JavaScript's Floating-Point Numbers
* JavaScript numbers are double-precision floating-point numbers.
* Integers in JavaScript are just a subset of doubles rather than a separate datatype.
* Bitwise operators treat numbers as if they were 32-bit signed integers.
* Be aware of limitations of precisions in floating-point arithmetic.

#### Item 3: Beware of Implicit Coercions
* Type errors can be silently hidden by implicit coercions.
* The + operator is overloaded to do addition or string concatenation depending on its argument types.
* Objects are coerced to numbers via valueOf and to strings via toString
* Objects with valueOf methods should implement a toString method that provides a string representation of the number produced by valueOf.
* Use typeof or comparison to undefined rather than truthiness to test for undefined values.

#### Item 4: Prefer Primitives to Object Wrappers
* Object wrappers for primitive types do not have the same behavior as their primitive values when compared for equality.
* Getting and setting properties on primitives implicitly creates object wrappers.

#### Item 5: Avoid using == with Mixed types
