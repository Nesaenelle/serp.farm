function isScrolledIntoView(elem , offsetVal) {
    var docViewTop = window.pageYOffset;
    var docViewBottom = docViewTop + window.innerHeight;
    var elemTop = offset(elem).top;
    var elemBottom = elemTop + elem.clientHeight;
    return docViewTop >= elemTop - (offsetVal || 200)/*- window.innerHeight*/; // /((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function isInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
};

(function() {
    var tabs = document.querySelectorAll('[data-navigation]');

    window.addEventListener('scroll', function() {
        tabs.forEach(function(elem) {
            // if (isInViewport(elem)) {
            if (isScrolledIntoView(elem)) {
                var id = elem.getAttribute('data-navigation');

                var links = document.querySelectorAll('[data-navigation-link');
                links.forEach(function(link) {
                    if (link.getAttribute('data-navigation-link') === id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, false);
}());


(function() {
    var counterItems = document.querySelectorAll('[data-counter]');
    var trigerred = 0;

    function animateValue(element, start, end, duration, value) {
        var range = end - start;
        var current = start;
        var increment = end > start ? 1 : -1;
        var stepTime = Math.abs(Math.floor(duration / range));
        var obj = element;
        var timer = setInterval(function() {
            current += increment;
            obj.innerHTML = current + value;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    window.addEventListener('scroll', function() {
        if (isScrolledIntoView(counterItems[0], window.innerHeight - 150)) {
            counterItems.forEach(function(counter) {
                if (trigerred <= counterItems.length) {
                    var count = counter.getAttribute('data-counter');
                    var value = counter.getAttribute('data-counter-value');
                    animateValue(counter, 0, parseInt(count), 2000, value);
                    trigerred++;
                }
            });
        }
    }, false);
}());

(function() {
    var form = document.querySelector('#form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        window.location.href = '/thx.html';
    }, false);

    addListenersToControls();

    function addListenersToControls() {
        document.querySelectorAll('input').forEach(function(item) {
            item.addEventListener('input', function() {
                if (validate(this)) {
                    this.setCustomValidity('');
                    this.classList.remove('has-error');
                    this.classList.add('valid');
                } else {
                    this.setCustomValidity(this.getAttribute('title'))
                    this.classList.add('has-error');
                    this.classList.remove('valid')
                }
            }, false);
        });
    }

    function validate(control) {
        var pattern = control.getAttribute('pattern');
        var reg = new RegExp(pattern);
        return pattern ? reg.test(control.value) : true;
    }
}());


(function() {
    var burgerBtn = document.querySelector('.header__burger');
    var dropdown = document.querySelector('.header__burger__dropdown');

    dropdown.querySelector('.header__burger__dropdown__close').addEventListener('click', function(e) {
        dropdown.classList.remove('opened');
    }, false);

    burgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (dropdown.classList.contains('opened')) {
            dropdown.classList.remove('opened');
        } else {
            dropdown.classList.add('opened');
        }
    }, false);
    window.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('opened');
        }
    }, false);
}());

(function() {
    var counterItems = document.querySelectorAll('[data-paralax]');
    var images = document.querySelector('.sitemanager-block__site-images');

    window.addEventListener('scroll', function(e) {
        if (isInViewport(images)) {
            counterItems.forEach(function(item) {
                var val = (offset(images).top - window.pageYOffset) / 2 * parseFloat(item.getAttribute('data-paralax')); //checkScrollSpeed() + 'px';
                item.style.transform = 'translateY(' + val + 'px)'
            });
        }
    });

    var checkScrollSpeed = (function(settings) {
        settings = settings || {};

        var lastPos, newPos, timer, delta,
            delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

        function clear() {
            lastPos = null;
            delta = 0;
        }

        clear();

        return function() {
            newPos = window.scrollY;
            if (lastPos != null) { // && newPos < maxScroll 
                delta = newPos - lastPos;
            }
            lastPos = newPos;
            clearTimeout(timer);
            timer = setTimeout(clear, delay);
            return delta;
        };
    })();
}());