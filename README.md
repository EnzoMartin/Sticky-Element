Sticking an Element when Scrolling
=======================

This is a jQuery plugin to make an element scroll with the page inside the boundaries of a specified container.

There are many plugins like this, this one was built to be simple and lightweight.

###Usage:

```javascript
$('scrolling_item_selector').sticky('scrolling_container_selector');
```

You can pass in a class or ID into either one. Note that the container will get set to position relative.

###Options:
| Name  | Default | Description |
| ------------- | ------------- | ------------- |
| useTransition | true | Use native CSS3 `transition` property (recommended) |
| animate | false | Use jQuery animate function |
| animTime | 300 | Time it takes for animation to complete in `ms` |
| animDelay | 300 | Delay until the animation starts in `ms`, used only if `animate` is `true` |

**Note**: If you set `useTransition` to `true`, `animate` will always be treated as `false`

###Methods:

You can call various methods on a sticky element instance

| Name  | Description |
| ------------- | ------------- |
| `update` | Updates the position and boundaries of the element |
| `toggleFreeze` | Locks the element where it is until unfrozen |
| `setBoundaries` | Updates the top and bottom boundaries of the element |
| `moveIt` | Manually move the element to the scroll position within its parent boundaries | 

####Example usage:

```javascript
// This will freeze/unfreeze the sticky element
$('#sticky').sticky('toggleFreeze');
```

## License

Copyright (c) 2010-2013

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
