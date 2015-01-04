(function(root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['react'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('react'));
    } else {
        // Browser globals
        root.reactPackLayout = factory(root.React);
    }
}(this, function(React) {
    'use strict';

    var PropTypes = React.PropTypes;

    var PackLayout = React.createClass({
        displayName: 'PackLayout',

        propTypes: {
            tag: PropTypes.string,
            columnWidth: PropTypes.number,
            itemMargin: PropTypes.number,
            repositionOnResize: PropTypes.bool,
            resizeThrottleTimeout: PropTypes.number
        },

        getDefaultProps: function() {
            return {
                tag: 'ul',
                itemMargin: 10,
                repositionOnResize: true,
                resizeThrottleTimeout: 250
            };
        },

        getColumnArray: function() {
            var layoutWidth = this.el.offsetWidth;
            var columnWidth = this.getColumnWidth();
            var columnCount = Math.floor(layoutWidth / (columnWidth + this.props.itemMargin));
            var columns = [];

            for (var i = 0; i < columnCount; i++) {
                columns.push(this.props.itemMargin);
            }

            return columns;
        },

        reposition: function() {
            var columns  = this.getColumnArray(),
                children = this.el.childNodes,
                margin   = this.props.itemMargin,
                colWidth = this.getColumnWidth();

            for (var i = 0; i < children.length; i++) {
                var min = +Infinity, minIndex = 0;
                for (var c = 0; c < columns.length; c++) {
                    if (columns[c] < min) {
                        min = columns[c];
                        minIndex = c;
                    }
                }

                var leftPos = margin + (minIndex * (colWidth + margin * 2));
                children[i].style.left = leftPos + 'px';
                children[i].style.top = min + 'px';

                columns[minIndex] = min + children[i].offsetHeight + margin;
            }
        },

        getColumnWidth: function() {
            return this.props.columnWidth || this.el.childNodes[0].offsetWidth;
        },

        componentDidMount: function() {
            this.el = this.getDOMNode();
            this.onWindowResize = throttle(this.reposition, this.props.resizeThrottleTimeout, this);

            if (this.props.repositionOnResize) {
                window.addEventListener('resize', this.onWindowResize, false);
            }

            this.reposition();
        },

        componentWillUnmount: function() {
            if (this.props.repositionOnResize) {
                window.removeEventListener('resize', this.onWindowResize, false);
            }
        },

        render: function() {
            var root = React.DOM[this.props.tag];
            var props = {
                className: this.props.className
            };

            return root(props, this.props.children);
        }
    });

    function throttle(fn, threshold, context) {
        var last, deferTimer;
        return function() {
            var now = Date.now(), args = arguments;
            if (last && now < last + threshold) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    return PackLayout;
}));