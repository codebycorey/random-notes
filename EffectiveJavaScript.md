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

## Chapter 2 Variable Scope
#### Item 8: Minimize Use of the Global Object
* Avoid declaring global variables.
* Declare variables as locally as possible.
* Avoid adding properties to the global object.
* Use the global object for platform feature detection.

#### Item 9: Always Declare Local variables
* Always declare new local variables with var.
* Consider using lint tools to help check for unbound variables.

#### Item 10: Avoid with
* Avoid using with statements.
* Use short variable names for repeated access to an object.
* Explicitly bind local variables to object properties instead of implicitly binding them with a with statement.

#### Item 11: Get Comfortable with Closures
* Functions can refer to variables defined in outer scopes.
* Closures can outlive the function that creates them.
* Closures internally store references to their outer variables, and can both read and update their stored variables.

#### Item 12: Understand Variable Hoisting
* Variable declarations within a block are implicitly hoisted to the top of their enclosing function.
* Redeclaration of a variable are treated as a single variable.
* Consider manually hoisting local variable declarations to avoid confusion.

#### Item 13: Use Immediately Invoked Function Expressions to Create Local scopes
* Understand the difference between binding and assignment.
* Closures capture their outer variables by reference, not by value.
* Use Immediately invoked function expressions (IIFEs) to create local scopes.
* Be aware of the cases where wrapping a block in an IIFE can change its behavior.

#### Item 14: Beware of Unportable Scoping of Named Function expressions
* Use named function expressions to improve stack traces in Error objects and debuggers.
* Beware of pollution of function expression scope with Object.prototype in ES3 and buggy JavaScript environments.
* Consider avoiding named function expressions or removing them before shipping.
* If you are shipping in properly implement ES5 environments, you've got nothing to worry about.

#### Item 15: Beware of Unportable Scoping of Block-Local Function Declarations
* Alway keep function declarations at the outmost level of a program or a containing function to avoid unportable behavior.
* Use var declarations with conditional assignment instead of conditional function declarations.

#### Item 16: Avoid Creating Local Variables with eval
* Avoid creating variables with eval that pollute the caller's scope.
* If eval code might create global variables, wrap the call in a nested function to prevent scope.

#### Item 17: Prefer Indirect eval to Direct eval
* Wrap eval in a sequence expression with a useless litersl to for the use of indirect eval.
* Prefer indirect eval to direct eval whenever possible.

## Chapter 3 Working with Functions
#### Item 18: Understand the Difference between Function, Method, and Constructor Calls
* Method calls provide the object in which the method property is looked up as their receiver.
* Function calls provide the global object (or undefined for strict functions) as their receiver. Calling methods with function call syntax is rarely useful.
* Constructors are called with new and receive a fresh object as their receiver.

#### Item 19: Get Comfortable Using Higher-Order Functions
* Higher-order functions are functions that take other functions as arguments or return functions as their result.
* Familiarize yourself with higher-order functions in existing libraries.
* Learn to detect common coding patterns that can be replace by higher-order functions.

#### Item 20: Use call to Call Methods with a Custom receiver
* Use the call method to call a function with a custom receiver.
* Use the call method for calling methods that may not exist on a given object.
* Use the call method for defining higher-order functions that allow clients to provide a receiver for the callback.

#### Item 21: Use apply to Call Functions with Different Numbers of Arguments
* Use the apply method to call variadic functions with a computed array of arguments.
* Use the first argument of apply to provide a receiver for variadic methods.

#### Item 22: Use arguments to Create Variadic Functions
* Use the implicit arguments object to implement variable-arity functions.
* Consider providing additional fixed-arity versions of the variadic functions you provide so that your consumers don't need to use the apply method.

#### Item 23: Never Modify the arguments object
* Never modify the arguments object.
* Copy the arguments object to a real array using `[].slice.call(arguments)` before modifying it.

#### Item 24: Use a Variable to Save a Reference to arguments
* Be aware of the function nesting level when referring to `arguments`.
* Bind an explicitly scoped reference to arguments in order to refer to it from nested functions.

#### Item 25: Use bind to Extract Methods with a Fixed receiver
* Beware that extracting a method does not bind the method's receiver to its object.
* When passing an object's method to a higher-order function, use an anonymous function to call the method on the appropriate receiver.
* Use `bind` as a shorthand for creating a function bound to the appropriate receiver.

#### Item 26: Use bind to Curry Functions
* Use `bind` to curry a function, that is, to create a delegating function with a fixed subset of the required arguments.
* Pass `null` or `undefined` as the receiver argument to curry a function that ignores its receiver.
