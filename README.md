Sticking an Element when Scrolling
=======================

This is a jQuery plugin to make an element scroll with the page inside the boundaries of a specified container.

There are many plugins like this, but this one was built to be simple and lightweight, with no frills nor extra features.

###Usage:

- Download from [GitHub][download], or `npm install jquery-sticky-element` if you're using [NPM][npm]
- Include jQuery & Sticky Element
- Invoke Sticky Element on the desired DOM element(s)

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="jquery.stickyelement.min.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        // Without options
        $('scrolling_item_selector').sticky('scrolling_container_selector');
        
        // With options
        $('scrolling_item_selector').sticky('scrolling_container_selector', {
            useTransition: false,
            animate: true,
            animTime: 1000
        });
    });
</script>
```

You can pass in a class or ID into either one. Note that the container will get set to position relative.

###Options:
| Name  | Default | Description |
| ------------- | ------------- | ------------- |
| useTransition | true | Use native CSS3 `transition` property (recommended) |
| animate | true | Use jQuery animate function |
| animTime | 200 | Time it takes for animation to complete in `ms` |
| animDelay | 300 | Delay until the animation starts in `ms`, used only if `animate` is `true` |
| offset | 0 | Offset the sticky element, useful if you have a fixed header that scrolls with the page |

**Note**: If you set `useTransition` to `true`, `animate` will always be treated as `false`

###Methods:

You can call various methods on a sticky element instance

| Name  | Description |
| ------------- | ------------- |
| `update` | Updates the position and boundaries of the element |
| `toggleFreeze` | Toggles whether the element will move based off the scroll position |
| `setBoundaries` | Updates the top and bottom boundaries of the element |
| `moveIt` | Manually move the element to the scroll position within its parent boundaries (useful if the element is frozen) | 
| `setOffset` | Update the offset of the sticky element | 

####Example usage:

```javascript
// This will update the sticky element's offset
$('#sticky').sticky('setOffset', 50);
```

###Events
| Name  | Description |
| ------------- | ------------- |
| `sticky-created` | Fired when the sticky element is created and ready to move |
| `sticky-update` | Fired when the element's update method is called to update boundaries |
| `sticky-hit-top` | Fired when the element reaches the top of it's container |
| `sticky-hit-bottom` | Fired when the element reaches the bottom of it's container |
| `sticky-frozen` | Fired when the element is frozen |
| `sticky-unfrozen` | Fired when the element is unfrozen |

## License

Copyright (c) 2010-2016

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm]:https://www.npmjs.com/
[download]:https://github.com/EnzoMartin/Sticky-Element/releases/latest