'use strict';

var React = require('react');

var PropTypes = React.PropTypes;

var PackLayout = React.createClass({
    displayName: 'PackLayout',

    propTypes: {
        tag: PropTypes.string,
        columnWidth: PropTypes.number,
        itemMargin: PropTypes.number,
        repositionOnResize: PropTypes.bool,
        resizeThrottleTimeout: PropTypes.number,
        setHeight: PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            tag: 'ul',
            itemMargin: 10,
            repositionOnResize: true,
            resizeThrottleTimeout: 250,
            setHeight: false
        };
    },

    getInitialState: function() {
        return {};
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
        var columns = this.getColumnArray(),
            children = this.el.childNodes,
            margin = this.props.itemMargin,
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

        if (this.props.setHeight) {
            var maxHeight = Math.max.apply(Math, columns);
            if (maxHeight !== this.state.height)
            {
                this.setState({height: maxHeight});
            }
        }
    },

    getColumnWidth: function() {
        return this.props.columnWidth || Math.floor(this.el.childNodes[0].getBoundingClientRect().width);
    },

    componentDidMount: function() {
        this.el = this.refs.container;

        // Old versions of React doesn't return the raw DOM node
        if (!(this.el instanceof window.Node)) {
            this.el = this.el.getDOMNode();
        }

        this.onWindowResize = throttle(this.reposition, this.props.resizeThrottleTimeout, this);

        if (this.props.repositionOnResize) {
            window.addEventListener('resize', this.onWindowResize, false);
        }

        this.reposition();
    },

    componentDidUpdate: function() {
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
            ref: 'container',
            className: this.props.className
        };

        if (this.props.setHeight) {
            props.style = { height: this.state.height + "px" };
        }

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

module.exports = PackLayout;
