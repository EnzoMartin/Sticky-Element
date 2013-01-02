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
