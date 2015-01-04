# react-pack-layout
React component for "packing" elements together in a pinterest-like layout.

## Demos
See [the demo page](http://rexxars.github.io/react-pack-layout/).

## Installation
`react-pack-layout` can be installed using [npm](https://npmjs.org/):

```
npm install react-pack-layout
```

## Basic usage

```javascript
var React = require('react');
var PackLayout = React.createFactory(require('react-pack-layout'));

// Render the component
React.render(
    PackLayout(
        { tag: 'ul', className: 'packed-layout' },
        React.DOM.li(null, 'One element'),
        React.DOM.li(null, 'Another element'),
        React.DOM.li(null, 'A third element'),
        React.DOM.li(null, 'A fourth element'),
        React.DOM.li(null, 'A fifth element')
    )
), document.body);

// Or, with JSX:
React.render(
    <PackLayout tag="ul" className="packed-layout">
        <li>One element</li>
        <li>Another element</li>
        <li>A third element</li>
        <li>A fourth element</li>
        <li>A fifth element</li>
    </PackLayout>,
    document.body
);
```

Properties:
```
{
    // The root-level DOM node tag, defaults to 'ul'
    tag: React.PropTypes.string,

    // The width of each column, in pixels. If not set, will use width of first child
    columnWidth: PropTypes.number,

    // Margin between each item, in pixels. Defaults to 10.
    itemMargin: PropTypes.number,

    // Whether to automatically reposition elements when the window is resized. Defaults to true.
    repositionOnResize: PropTypes.bool,

    // How often the repositioning should be performed while the browser is being resized. Defaults to 250ms.
    resizeThrottleTimeout: PropTypes.number
}
```

## Important notes

* This is a component in early development, and probably should not be used in production yet. The API *will* change in the future.
* Child elements that changes size after render won't work as expected. The component needs access to the height of each element to properly align elements. Images without a defined size will for instance break.
* It does not do things in "the react way" - styles are set explicitly on child elements through the browsers DOM API, which is bad.

## License
Licensed under the MIT License, see LICENSE