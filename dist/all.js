function isScrolledIntoView(elem) {
    var docViewTop = window.pageYOffset;
    var docViewBottom = docViewTop + window.innerHeight;
    var elemTop = offset(elem).top;
    var elemBottom = elemTop + elem.clientHeight;
    return /*docViewTop >= elemTop - window.innerHeight;//*/ ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
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
            if (isInViewport(elem)) {
                var id = elem.getAttribute('data-navigation');
                console.log(id);

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
        counterItems.forEach(function(counter) {
            if (isScrolledIntoView(counter) && trigerred <= counterItems.length) {
                // console.log(1);
                var count = counter.getAttribute('data-counter');
                var value = counter.getAttribute('data-counter-value');
                animateValue(counter, 0, parseInt(count), 2000, value);
                trigerred++;
            }
        });
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