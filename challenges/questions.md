[Back to home](../README.md)
# Challenging Questions
A collection of questions and challenges

## Questions
```
var templateObj = {
  sentence: 'The {{ thing }} {{ action }}.',
  thing: '{{ color }} {{ animal }}',
  action: '{{ flies around the {{ place }} }}',
  color: 'red',
  animal: 'bird',
  place: 'house'
};

function beard (template, key) {
  // Write this
}

should(beard(templateObj, 'sentence')).equal('The red bird flies around the house.');
```
