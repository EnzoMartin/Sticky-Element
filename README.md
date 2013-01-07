Sticking an Element when Scrolling
=======================

This is a jQuery plugin to make an element scroll with the page inside the boundaries of a specified container.

###Usage:

```javascript
$('scrolling_item').sticky('scrolling_container');
```

You can pass in a class or ID into either one. Note that the container will get set to position relative.

###Options:

* `useFixed`: Default: `true` - Setting this to `false` will instead always use relative positioning
* `animate`: Default: `false` - Setting this to `true` will animate the scrolling
* `animTime`: Default: `300` - Animation duration time

## License

Copyright (c) 2010-2013

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
