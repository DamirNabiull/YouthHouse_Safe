const EndScreenTime = 100; // В секундах
const InactiveTime = 50; // В секундах

var scroller_1 = document.querySelector(".scroller_1");
var scroller_2 = document.querySelector(".scroller_2");
var scroller_3 = document.querySelector(".scroller_3");
var scroller_4 = document.querySelector(".scroller_4");
var scrollers = [scroller_1, scroller_2, scroller_3, scroller_4];

var correctCodes = document.querySelectorAll(".correctCode");

var safeDiv = document.querySelector(".safe");
var starDiv = document.querySelector(".firstPage");
var endDiv = document.querySelector(".end");

var backButton = document.querySelector(".backButton");
var openButton = document.querySelector(".openButton");
var inactiveButton = document.querySelector(".inactiveOpenButton");

var currentCode = [0, 0, 0, 0]

var inactive = false;
var state = 0;

var timeLeftTimer;


var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

function showStart() {
    // location.reload();
    state = 0;

    clearTimeout(timeLeftTimer);

    enableScroll();

    starDiv.style.visibility = "visible";
    safeDiv.style.visibility = "hidden";
    endDiv.style.visibility = "hidden";

    inactiveButton.style.visibility = "hidden";
    inactive = false;
}

function showSafe() {
    state = 1;

    setCodeBackground("transparent");

    clearTimeout(timeLeftTimer);
    timeLeftTimer = setTimeout(function () {
        showStart();
    }, InactiveTime * 1000);

    enableScroll();

    scrollers.forEach((scroller) => {
        setInit(scroller);
    });

    safeDiv.style.visibility = "visible";
    starDiv.style.visibility = "hidden";
    endDiv.style.visibility = "hidden";

    inactiveButton.style.visibility = "visible";
    inactive = true;
}

function showEnd() {
    state = 2;

    clearTimeout(timeLeftTimer);
    timeLeftTimer = setTimeout(function () {
        showStart();
    }, EndScreenTime * 1000);

    enableScroll();

    endDiv.style.visibility = "visible";
    starDiv.style.visibility = "hidden";
    safeDiv.style.visibility = "hidden";

    inactiveButton.style.visibility = "hidden";
    inactive = false;
}

function setCodeBackground(color) {
    correctCodes.forEach((code) => {
        code.style.backgroundColor = color;
    });
}

function correctCodeChoosen() {
    inactiveButton.style.visibility = "hidden";
    inactive = false;

    disableScroll();

    setTimeout(function () {
        if (!inactive) {
            setCodeBackground("#D4EF01");
        }
    }, 100);
}

// sorting images
function updateSort(id, el) {
    // var scrollHeight = el.scrollHeight;
    var scrollTop = el.scrollTop;
    // var height = el.offsetHeight;
    // var items = el.children;

    clearTimeout(timeLeftTimer);
    timeLeftTimer = setTimeout(function () {
        showStart();
    }, InactiveTime * 1000);

    var item_id;

    if (scrollTop >= 0 && scrollTop <= 111) {
        item_id = 0
    }
    else if (scrollTop >= 112 && scrollTop <= 322) {
        item_id = 1
    }
    else if (scrollTop >= 323 && scrollTop <= 553) {
        item_id = 2
    }
    else if (scrollTop >= 554 && scrollTop <= 774) {
        item_id = 3
    }
    else if (scrollTop >= 775 && scrollTop <= 995) {
        item_id = 4
    }
    else if (scrollTop >= 996 && scrollTop <= 1217) {
        item_id = 5
    }
    else if (scrollTop >= 1218 && scrollTop <= 1438) {
        item_id = 6
    }
    else if (scrollTop >= 1439 && scrollTop <= 1659) {
        item_id = 7
    }
    else if (scrollTop >= 1660 && scrollTop <= 1880) {
        item_id = 8
    }
    else if (scrollTop >= 1881) {
        item_id = 9
    }
    else {
        item_id = -1
    }

    if (item_id > -1) {
        currentCode[id] = item_id
    }

    if (currentCode[0] == 1 && currentCode[1] == 5 && currentCode[2] == 8 && currentCode[3] == 9) {
        correctCodeChoosen();
    } else {
        enableScroll();
        if (state == 1 && !inactive) {
            console.log(state)
            console.log(inactive)

            setCodeBackground("transparent");
            inactiveButton.style.visibility = "visible";
        }
    }
}

function setInit(el) {
    el.scrollTop = 0;
}

var scrollerId = -1;

scrollers.forEach((scroller) => {
    var lastscroll;
    scrollerId = scrollerId + 1
    let scrollId = scrollerId;

    scroller.addEventListener("scroll", function () {
        var el = this;
        var id = scrollId;

        if (lastscroll) {
            clearTimeout(lastscroll);
        }
        lastscroll = setTimeout(function () {
            updateSort(id, el);
        }, 200);
    });


    setInit(scroller);
});