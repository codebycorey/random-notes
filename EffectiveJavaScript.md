[Back to home](./README.md)
# Effective JavaScript
Book by: David Herman

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
* The == operator applies a confusing set of implicit coercions when its arguments are of different types.
* Use === to make it clear to your readers that your comparison does not involve any implicit coercions.
* Use your own explicit coercions when comparing values of different types to make your program's behavior clearer.

#### Item 6: Learn the Limits of Semicolon Insertion
* Semicolons are only ever inferred before a }, at the end of a line, or at the end of a program.
* Semicolons are only ever inferred when the next token cannot be parsed.
Never omit a semicolon before a statement beginning with (, [, +, -, or /.
* When concatenating scripts, insert semicolons explicitly between scripts.
* Never put a newline before the argument to return, throw, break, continue, ++, or --.
* Semicolons are never inferred as separators in the head of a for loop or as empty statements.

#### Item 7: Think of Strings As Sequences of 16-Bit Code Units
* JavaScript strings consist of 16-bit code units, not Unicode code points.
* Unicode code points 2^16 and above are represented in JavaScript by two code units, known as a surrogate pair.
* Surrogate pairs throw off string element counts, affecting length, charAt, charCodeAt, and regular expression patterns such as "." .
* Use third-party libraries for writing code point-aware string manipulation.
* Whenever you are using a library that works with strings, consult the documentation to see how it handles the full range of code points.
