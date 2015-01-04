'use strict';

var React = window.React || require('react');
var packLayout = React.createFactory(window.reactPackLayout || require('react-layout-pack'));
var isWindowLarge = function() { return window.innerWidth > 750; };
var wasWindowLarge = isWindowLarge();

var imgLi = function(src, height) {
    var imgHeight = Math.floor(isWindowLarge() ? height : height / 2.266666667);

    return React.DOM.li(
        null,
        React.DOM.img({ src: 'img/' + src, alt: '', height: imgHeight })
    );
};

window.addEventListener('resize', function() {
    if (wasWindowLarge !== isWindowLarge()) {
        renderDemo();
        wasWindowLarge = !wasWindowLarge;
    }
}, 250);

function renderDemo() {
    React.render(getLayout(), document.getElementById('demo'));
}

function getLayout() {
    return packLayout(
        {
            className: 'pack-layout',
            itemMargin: isWindowLarge() ? 10 : 5
        },

        imgLi('beer.jpg', 255),
        imgLi('plant.jpg', 453),
        imgLi('ego.jpg', 302),

        React.DOM.li(
            null,
            React.DOM.h3(null, 'License'),
            React.DOM.p(null, 'react-layout-pack is MIT-licensed')
        ),

        imgLi('coast.jpg', 252),
        imgLi('sunrise.jpg', 252),
        imgLi('tree.jpg', 459),
        imgLi('sluser.jpg', 255),
        imgLi('chania.jpg', 453),
        imgLi('legs.jpg', 453),
        imgLi('building.jpg', 453),
        imgLi('moss.jpg', 453),
        imgLi('bird.jpg', 255),

        React.DOM.li(
            null,
            React.DOM.h3(null, 'Works with text, too - see?'),
            React.DOM.p(null, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.')
        ),

        imgLi('alexandria.jpg', 255),
        imgLi('spiral.jpg', 575),
        imgLi('jordan.jpg', 453),
        imgLi('56k.jpg', 276),
        imgLi('spices.jpg', 309),
        imgLi('crete.jpg', 510),
        imgLi('santorini.jpg', 510),
        imgLi('android.jpg', 427),
        imgLi('rabbit.jpg', 375),
        imgLi('ce.jpg', 420),

        React.DOM.li({
            style: { background: '#2980b9', lineHeight: '320px', textAlign: 'center', color: '#fff', fontSize: '2em' }
        }, 'I\'m blue!'),

        imgLi('dragon.jpg', 227),
        imgLi('parrot.jpg', 574),
        imgLi('hovlandsdal.jpg', 255),
        imgLi('tulum.jpg', 453),
        imgLi('shells.jpg', 422),
        imgLi('unicode.jpg', 236),
        imgLi('beach.jpg', 546),
        imgLi('meercat.jpg', 637),
        imgLi('towers.jpg', 423),
        imgLi('bridges.jpg', 226),
        imgLi('paris.jpg', 178),
        imgLi('red-panda.jpg', 441),
        imgLi('sea.jpg', 436),
        imgLi('rome.jpg', 405),
        imgLi('keg.jpg', 226)
    );
}

renderDemo();