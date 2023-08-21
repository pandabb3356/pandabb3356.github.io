/* ===================================================================
 * Luther 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function (html) {

    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';


    /* Animations
     * -------------------------------------------------- */
    const tl = anime.timeline({
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
        .add({
            targets: '#loader',
            opacity: 0,
            duration: 1000,
            begin: function (anim) {
                window.scrollTo(0, 0);
            }
        })
        .add({
            targets: '#preloader',
            opacity: 0,
            complete: function (anim) {
                document.querySelector("#preloader").style.visibility = "hidden";
                document.querySelector("#preloader").style.display = "none";
            }
        })
        .add({
            targets: '.s-header',
            translateY: [-100, 0],
            opacity: [0, 1]
        }, '-=200')
        .add({
            targets: ['.s-intro .text-pretitle', '.s-intro .text-huge-title'],
            translateX: [100, 0],
            opacity: [0, 1],
            delay: anime.stagger(400)
        })
        .add({
            targets: '.circles span',
            keyframes: [
                {opacity: [0, .3]},
                {opacity: [.3, .1], delay: anime.stagger(100, {direction: 'reverse'})}
            ],
            delay: anime.stagger(100, {direction: 'reverse'})
        })
        .add({
            targets: '.intro-social li',
            translateX: [-50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100, {direction: 'reverse'})
        })
        .add({
            targets: '.intro-scrolldown',
            translateY: [100, 0],
            opacity: [0, 1]
        }, '-=800');


    /* Preloader
     * -------------------------------------------------- */
    const ssPreloader = function () {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        window.addEventListener('load', function () {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function (item) {
                item.classList.remove('ss-animated');
            });

            tl.play();
        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     // window.scrollTo(0, 0);
        // });

    }; // end ssPreloader


    /* Mobile Menu
     * ---------------------------------------------------- */
    const ssMobileMenu = function () {

        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function (event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function (link) {
            link.addEventListener("click", function (event) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function () {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    }; // end ssMobileMenu


    /* Highlight active menu link on pagescroll
     * ------------------------------------------------------ */
    const ssScrollSpy = function () {

        const sections = document.querySelectorAll(".target-section");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {

            // Get current scroll position
            let scrollY = window.pageYOffset;

            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function (current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");

                /* If our current scroll position enters the space where current section
                 * on screen is, add .current class to parent element(li) of the thecorresponding
                 * navigation link, else remove it. To know which link is active, we use
                 * sectionId variable we are getting while looping through sections as
                 * an selector
                 */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
                } else {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.remove("current");
                }
            });
        }

    }; // end ssScrollSpy


    /* Animate elements if in viewport
     * ------------------------------------------------------ */
    const ssViewAnimate = function () {

        const blocks = document.querySelectorAll("[data-animate-block]");

        window.addEventListener("scroll", viewportAnimation);

        function viewportAnimation() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function (current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains("ss-animated");

                if (inView && (!isAnimated)) {
                    anime({
                        targets: current.querySelectorAll("[data-animate-el]"),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(400, {start: 200}),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function (anim) {
                            current.classList.add("ss-animated");
                        }
                    });
                }
            });
        }

    }; // end ssViewAnimate


    /* Swiper
     * ------------------------------------------------------ */
    const ssSwiper = function () {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
        });

    }; // end ssSwiper


    /* Lightbox
     * ------------------------------------------------------ */
    const ssLightbox = function () {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = [];

        folioLinks.forEach(function (link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function (instance) {
                        //detect Escape key press
                        document.addEventListener("keydown", function (event) {
                            event = event || window.event;
                            if (event.keyCode === 27) {
                                instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function (link, index) {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                modals[index].show();
            });
        });

    };  // end ssLightbox


    /* Alert boxes
     * ------------------------------------------------------ */
    const ssAlertBoxes = function () {

        const boxes = document.querySelectorAll('.alert-box');

        boxes.forEach(function (box) {

            box.addEventListener('click', function (event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function () {
                        box.style.display = "none";
                    }, 500)
                }
            });

        })

    }; // end ssAlertBoxes


    /* Smoothscroll
     * ------------------------------------------------------ */
    const ssMoveTo = function () {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t * (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');

        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function (trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo

    /* Clipboard
    * ------------------------------------------------------ */
    const ssClipboard = function () {
        // This script enhances code blocks on an HTML page by adding a copy button to each code block.
// It uses FontAwesome icons for visual representation and the ClipboardJS library for clipboard interactions.


        const isClassExisted = (element, className) => {
            return element.classList.contains(className)
        }

        const addClass = (element, className) => {
            const classList = element.classList;
            if (!isClassExisted(element, className)) {
                classList.add(className)
            }
        }

        const removeClass = (element, className) => {
            const classList = element.classList;
            if (isClassExisted(element, className)) {
                classList.remove(className)
            }
        }


// Wait for the DOM to be fully loaded before executing the following code.
        document.addEventListener('DOMContentLoaded', function () {
            const DELAY_BEFORE_EXECUTION = 1000; // 1 second delay to ensure all elements are loaded.

            // Delay execution to allow all elements to be properly loaded and ready.
            setTimeout(() => {
                // Select all pre elements with class "highlight" to target code blocks.
                const codeBlocks = document.querySelectorAll('.highlight pre');

                // Initialize the ClipboardJS library using the ".copy-btn" class selector.
                const clipboard = new ClipboardJS('.copy-btn');

                // Define constants for FontAwesome icon classes, button class, and icon change delay.
                const FA_SOLID_CLASS = 'fas';
                const FA_COPY_ICON_CLASS = 'fa-copy';
                const FA_COPIED_ICON_CLASS = 'fa-check';
                const COPIED_CLASS = "copied";
                const COPY_BUTTON_CLASS = 'copy-btn';

                // Iterate through each code block element.
                codeBlocks.forEach(function (block) {
                    // Create a copy button by appending a div element with the appropriate class.
                    const btn = document.createElement('div');
                    btn.className = COPY_BUTTON_CLASS;

                    // Create an icon element using FontAwesome for the button.
                    const icon = document.createElement('i');
                    addClass(icon, FA_SOLID_CLASS);
                    addClass(icon, FA_COPY_ICON_CLASS);
                    btn.appendChild(icon);

                    // Extract the text content of the code within the <code> element.
                    const innerText = block.querySelector("code").innerText;

                    // Set the data attribute with the code content for clipboard copying.
                    btn.setAttribute('data-clipboard-text', innerText);

                    // Prepend the copy button to the beginning of the code block.
                    block.prepend(btn);
                });

                // Handle successful clipboard copying.
                clipboard.on('success', function (e) {
                    // Temporarily switch the icon to a clipboard icon for visual feedback.
                    const icon = e.trigger.querySelector('i');
                    const btn = e.trigger;

                    removeClass(icon, FA_COPY_ICON_CLASS);
                    addClass(icon, FA_COPIED_ICON_CLASS);
                    addClass(btn, COPIED_CLASS);

                    // Revert the icon to the copy icon after a short delay.
                    setTimeout(function () {
                        removeClass(icon, FA_COPIED_ICON_CLASS);
                        removeClass(btn, COPIED_CLASS);
                        addClass(icon, FA_COPY_ICON_CLASS);
                    }, DELAY_BEFORE_EXECUTION);

                    // Clear the user's selection (highlighting) to provide feedback.
                    e.clearSelection();
                });

                // Handle any errors that occur during clipboard copying.
                clipboard.on('error', function (e) {
                    // Display an error message, such as in a console.
                    console.error("Failed to copy.");
                });
            }, DELAY_BEFORE_EXECUTION);
        });
    };

    /* Search
    * ------------------------------------------------------ */
    const ssSearch = function () {

        const searchWrap = document.querySelector('.s-header__search');
        const searchTrigger = document.querySelector('.s-header__search-trigger');

        if (!(searchWrap && searchTrigger)) return;

        const searchField = searchWrap.querySelector('.s-header__search-field');
        const closeSearch = searchWrap.querySelector('.s-header__overlay-close');
        const siteBody = document.querySelector('body');

        searchTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            siteBody.classList.add('search-is-visible');
            setTimeout(function () {
                searchWrap.querySelector('.s-header__search-field').focus();
            }, 100);
        });

        closeSearch.addEventListener('click', function (e) {
            e.stopPropagation();

            if (siteBody.classList.contains('search-is-visible')) {
                siteBody.classList.remove('search-is-visible');
                setTimeout(function () {
                    searchWrap.querySelector('.s-header__search-field').blur();
                }, 100);
            }
        });

        searchWrap.addEventListener('click', function (e) {
            if (!(e.target.matches('.s-header__search-inner')) && !(e.target.matches('.stork-message'))) {
                closeSearch.dispatchEvent(new Event('click'));
            }
        });

        searchField.addEventListener('click', function (e) {
            e.stopPropagation();
        })

        searchField.setAttribute('placeholder', 'Search for...');
        searchField.setAttribute('autocomplete', 'off');

    }; // end ssSearch


    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();
        ssClipboard();
        ssSearch();

    })();

})(document.documentElement);