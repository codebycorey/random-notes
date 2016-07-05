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
* Objects are coerced to numbers via `valueOf` and to strings via `toString`
* Objects with `valueOf` methods should implement a `toString` method that provides a string representation of the number produced by `valueOf`.
* Use typeof or comparison to undefined rather than truthiness to test for undefined values.

#### Item 4: Prefer Primitives to Object Wrappers
* Object wrappers for primitive types do not have the same behavior as their primitive values when compared for equality.
* Getting and setting properties on primitives implicitly creates object wrappers.

#### Item 5: Avoid using == with Mixed types
* The `==` operator applies a confusing set of implicit coercions when its arguments are of different types.
* Use `===` to make it clear to your readers that your comparison does not involve any implicit coercions.
* Use your own explicit coercions when comparing values of different types to make your program's behavior clearer.

#### Item 6: Learn the Limits of Semicolon Insertion
* Semicolons are only ever inferred before a `}`, at the end of a line, or at the end of a program.
* Semicolons are only ever inferred when the next token cannot be parsed.
Never omit a semicolon before a statement beginning with `(`, `[`, `+`, `-`, or `/`.
* When concatenating scripts, insert semicolons explicitly between scripts.
* Never put a newline before the argument to return, throw, break, continue, `++`, or `--`.
* Semicolons are never inferred as separators in the head of a for loop or as empty statements.

#### Item 7: Think of Strings As Sequences of 16-Bit Code Units
* JavaScript strings consist of 16-bit code units, not Unicode code points.
* Unicode code points 2^16 and above are represented in JavaScript by two code units, known as a surrogate pair.
* Surrogate pairs throw off string element counts, affecting length, `charAt`, `charCodeAt`, and regular expression patterns such as "." .
* Use third-party libraries for writing code point-aware string manipulation.
* Whenever you are using a library that works with strings, consult the documentation to see how it handles the full range of code points.

## Chapter 2 Variable Scope
#### Item 8: Minimize Use of the Global Object
* Avoid declaring global variables.
* Declare variables as locally as possible.
* Avoid adding properties to the global object.
* Use the global object for platform feature detection.

#### Item 9: Always Declare Local variables
* Always declare new local variables with `var`.
* Consider using lint tools to help check for unbound variables.

#### Item 10: Avoid with
* Avoid using `with` statements.
* Use short variable names for repeated access to an object.
* Explicitly bind local variables to object properties instead of implicitly binding them with a `with` statement.

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
* Use named function expressions to improve stack traces in `Error` objects and debuggers.
* Beware of pollution of function expression scope with Object.prototype in ES3 and buggy JavaScript environments.
* Consider avoiding named function expressions or removing them before shipping.
* If you are shipping in properly implement ES5 environments, you've got nothing to worry about.

#### Item 15: Beware of Unportable Scoping of Block-Local Function Declarations
* Alway keep function declarations at the outmost level of a program or a containing function to avoid unportable behavior.
* Use `var` declarations with conditional assignment instead of conditional function declarations.

#### Item 16: Avoid Creating Local Variables with eval
* Avoid creating variables with `eval` that pollute the caller's scope.
* If `eval` code might create global variables, wrap the call in a nested function to prevent scope.

#### Item 17: Prefer Indirect eval to Direct eval
* Wrap `eval` in a sequence expression with a useless litersl to for the use of indirect `eval`.
* Prefer indirect `eval` to direct `eval` whenever possible.

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
* Use the `call` method to call a function with a custom receiver.
* Use the `call` method for calling methods that may not exist on a given object.
* Use the `call` method for defining higher-order functions that allow clients to provide a receiver for the callback.

#### Item 21: Use apply to Call Functions with Different Numbers of Arguments
* Use the apply method to call variadic functions with a computed array of arguments.
* Use the first argument of apply to provide a receiver for variadic methods.

#### Item 22: Use arguments to Create Variadic Functions
* Use the implicit `arguments` object to implement variable-arity functions.
* Consider providing additional fixed-arity versions of the variadic functions you provide so that your consumers don't need to use the apply method.

#### Item 23: Never Modify the arguments object
* Never modify the `arguments` object.
* Copy the `arguments` object to a real array using `[].slice.call(arguments)` before modifying it.

#### Item 24: Use a Variable to Save a Reference to arguments
* Be aware of the function nesting level when referring to `arguments`.
* Bind an explicitly scoped reference to `arguments` in order to refer to it from nested functions.

#### Item 25: Use bind to Extract Methods with a Fixed receiver
* Beware that extracting a method does not bind the method's receiver to its object.
* When passing an object's method to a higher-order function, use an anonymous function to call the method on the appropriate receiver.
* Use `bind` as a shorthand for creating a function bound to the appropriate receiver.

#### Item 26: Use bind to Curry Functions
* Use `bind` to curry a function, that is, to create a delegating function with a fixed subset of the required arguments.
* Pass `null` or `undefined` as the receiver argument to curry a function that ignores its receiver.

#### Item 27: Prefer Closures to Strings for Encapsulating Code
* Never include local references in strings when sending them to APIs that execute them with `eval`.
* Prefer APIs that accept functions to call rather than strings to `eval`.

#### Item 28: Avoid Replying on the toString Method of Functions
* JavaScript engines are not required to produce accurate reflections of function source code via to String.
* Never rely on precise details of function source, since different engines may produce different results from `toString`.
* The results of `toString` do not expose the values of local variables stored in a closure.
* In general, avoid using `toString` on functions.

#### Item 29: Avoid Nonstandard Stack Inspection Properties
* Avoid the nonstandard `anguments.caller` adn `arguments.callee` because they are not reliably portable.
* Avoid the nonstandard `caller` property of functions, because it does not reliably contain complete information about the stack.

## Chapter 4 Objects and Prototypes
#### Item 30: Understand the Difference between prototype, getPrototypeOf, and __proto__
* `C.prototype` determines the prototype of objects created by `new C()`.
* `Object.getPrototypeOf(obj)` is the standard ES5 function for retrieving the prototype of an object.
* `obj.__proto__` is a nonstandard mechanism for retrieving the prototype of an object.
* A class is a design pattern consisting of a constructor function and an associated prototype.

#### Item 31: Prefer Object.getPrototypeOf to __proto__
* Prefer the standards-compliant `Object.getPrototypeOf` to the nonstandard `__proto__` property.
* Implement `Object.getPrototypeOf` in non-ES5 environments that support `__proto__`.

#### Item 32: Never Modify __proto__
* Never modifiy an object's `__proto__` property.
* Use `Object.create` to provide a custom prototype for new objects.

#### Item 33: Make Your Constructors new-Agnostic
* Make a constructor agnostic to its caller's syntax by reinvoking itself with `new` or with `Object.create`.
* Document clearly when a function expects to be called with `new`.

#### Item 34: Store Methods on Prototypes
* Storing methods on instance objects creates multiple copies of the functions, one per instance object.
* Prefer storing methods on prototypes over storing them on instance objects.

#### Item 35: Use Closures to Store Private Data
* Closure variables are private, accessible only to local references.
* Use local variables as private data to enforce information hiding within methods.

#### Item 36: Store Instance State Only on Instant Objects
* Mutable data can be problematic when shared, and prototypes are shared between all their instances.
* Store mutable per-instance state on instance objects.

#### Item 37: Recognize the Implicit Binding of this
* The scope of `this` is always determined by its nearest enclosing function.
* Use a local variable, usually called `self`, `me`, or `that`, to make a `this`-binding available to inner functions.

#### Item 38: Call Superclass Constructors from Subclass Constructors
* Call the superclass constructor explicitly from subclass constructors, passing `this` as the explicit receiver.
* Use `Object.create` to construct the subclass prototype object to avoid calling the superclass constructor.

#### Item 39: Never Reuse Superclass Property Names
* Be aware of all property names used by your superclasses.
* Never reuse a superclass property name in a subclass.

#### Item 40: Avoid Inheriting from Standard Classes
* Inheriting from standard classes tends to break due to special internal properties such as `[[Class]]`.
* Prefer delegating to properties instead of inheriting from standard classes.

#### Item 41: Treat Prototypes As an Implementation Detail
* Objects are interfaces; prototypes are implementations.
* Avoid inspecting the prototype structure of objects you don't control.
* Avoid inspecting properties that implement the internals of objects you don't control.

#### Item 42: Avoid Reckless Monkey-Patching
* Avoid reckless monkey-patching.
* Document any monkey-patching performed by a library.
* Consider making monkey-patching optional by performing the modifications in an exported function.
* Use monkey-patching to provide polyfills for missing standard APIs.

## Chapter 5 Arrays and Dictionaries
#### Item 43: Build Lightweight Dictionaries from Direct Instances of Object
* Use object literals to construct lightweight dictionaries.
* Lightweight dictionaries should be direct descendants of Object.prototype to protect against prototype pollution in `for...in` loops.

#### Item 44: Use null Prototypes to Precent Prototype Pollution
* In ES5, use `Object.create(null)` to create prototype-free empty objects that are less susceptible to pollution.
* In older environments, consider using `{ __proto__: null }`.
* But beware that `__proto__` is nether standard nor entirely portable and may be removed in future JavaScript environments.
* Never use the name `__proto__` as a dictionary key since some environments treat this property specially.

#### Item 45: Use hasOwnProperty to Protect Against Prototype Pollution
* use `hasOwnProperty` to protect against prototype pollution.
* Use lexical scope and `call` to protect against overriding of the `hasOwnProperty` method.
* Consider implementing dictionary operations in a class that encapsulates the boilerplate `hasOwnProperty` tests.
* Use a dictionary class to protect against the use of `"__proto__"` as a key.

#### Item 46: Prefer Arrays to Dictionaries for Ordered Collections
* Avoid replying on the order in which `for...in` loops enumerate object properties.
* If you aggregate data in a dictionary, make sure the aggregate operations are order-insensitive.
* Use arrays instead of dictionary objects for ordered collections.

#### Item 47: Never Add Enumerable Properties to Object.prototype
* Avoid adding properties to `Object.prototype`.
* Consider writing a function instead of an `Object.prototype` method.
* If you do add properties to `Object.prototype`, use ES5's `Object.defineProperty` to define them as non-enumerable properties.

#### Item 48: Avoid Modifying an Object during Enumeration
* Make sure not to modify an object while enumerating its properties with a `for...in` loop.
* Use a `while` loop or classic `for` loop instead of a `for..in` loop when iterating over an object whose contents might change during the loop.
* For predictable enumeration over a changing data structure, consider using a sequential data structure such as an array instead of a dictionary object.

#### Item 49: Prefer for Loops to for...in Loops for Array Iteration
* Always use a `for` loop rather than a `for..in` loop for iterating over the indexed properties of an array.
* Consider storing the `length` property of an array in a local variable before a loop to avoid recomputing the property lookup.

#### Item 50: Prefer Iteration Methods to Loops
* Use `iteration` methods such as `Array.prototype.forEach` and `Array.prototype.map` in place of `for` loops to make code more readable and avoid duplicating loop control logic.
* Use custom iteration functions to abstract common loop paterns that are not provided by the standard library.
* Traditional loops can still be appropriate in cases where early exit is necessary; alternatively, the `some` and `every` methods can be used for early exit.

#### Item 51: Reuse Generic Array Methods on Array-Like Objects
* Reuse generic `Array` methods on array-like objects by extracting method objects and using their `call` method.
* Any object can be used with generic `Array` methods if it has indexed properties and an appropriate `length` property.

#### Item 52: Prefer Array Literals to the Array Constructor
* The `Array` constructor behaves differently if its first argument is a number.
* Use array literals instead of the `Array` constructor.

## Chapter 6 Library and API Design
#### Item 53: Maintain Consistent Conventions
* Use consistent conventions for variable names and function signatures.
* Don't deviate from conventions your users are likely to encounter in other parts of their development platform.

#### Item 54: Treat undefined As "No Value"
* Avoid using `undefined` to represent anything other than the absence of a specific value.
* Use descriptive string values or objects with named boolean properties, rather than `undefined` or `null`, to represent application-specific flags.
* Test for `undefined` instead of checking `arguments.length` to provided parameter default values.
* Never use truthiness tests for parameter default values that should allow `0`, `NaN`, or the empty string as valid arguments.

#### Item 55: Accept Options Objects for Keyword Arguments
* Use options object to make APIs more readable and memorable.
* The arguments provide by an options object should all be treated as optional.
* Use an `extend` utility function to abstract out the logic of extracting values from options objects.

#### Item 56: Avoid Unnecessary State
* Prefer stateless APIs where possible.
* When providing stateful APIs, document the relevant state that each operation depends on.

#### Item 57: Use Structural Typing for Flexible Interfaces
* Use structural typing (also known as duck typing) for flexible object interfaces.
* Avoid inheritance when structural interfaces are more flexible and lightweight.
* Use mock objects, that is, alternative implementations of interfaces that provide repeatable behavior, for unit testing.

#### Item 58: Distinguish between Array and Array-Like
* Never overload structural types with other overlapping types.
* When overloading a structural type with other types, test for the other types first.
* Accept true arrays instead of array-like objects when overloading with other object types.
* Document whether your API accepts true arrays or array-like values.
* Use ES5's `Array.isArray` to test for true arrays.

#### Item 59: Avoid Excessive Coercion
* Avoid mixing coercion with overloading.
* Consider defensively guarding against unexpected inputs.

#### Item 60: Support Method Chaining
* Use method chaining to combine stateless operations.
* Support method chaining by designing stateless methods that produce new objects.
* Support method chaining in stateful methods by returning `this`.

## Chapter 7 Concurrency
#### Item 61: Don't Block the Event Queue on I/O
* Asynchronous APIs tale callbacks to defer processing of expensive operations and avoid blocking the main application.
* JavaScript accepts events concurrently but processes event handlers sequentially using an event queue.
* Never use blocking I/O in an application's event queue.

#### Item 62: Use Nested or Named Callbacks for Asynchronous Sequencing
* Use nested or named callbacks to perform several asynchronous operations in sequence.
* Try to strike a balance between excessive nesting of callbacks and awkward naming of non-nested callbacks.
* Avoid sequencing operations that can be performed concurrently.

#### Item 63: Be Aware of Dropped Errors
* Avoid copying and pasting error-handling code by writing shared error-handling functions.
* Make sure to handle all error conditions explicitly to avoid dropped errors.

#### Item 64: Use Recursion for Asynchronous Loops
* Loops cannot be asynchronous
* Use recursive functions to perform iterations in separate turns of the event loop.
* Recursion performed in separate turns of the event loop does not overflow the call stack.

## Source
Book: Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript  
Author: David Herman  
Link: [Amazon](https://www.amazon.com/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
