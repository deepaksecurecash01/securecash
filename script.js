var prevScrollpos = window.pageYOffset;
var browserWidth = window.outerWidth;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  var hideBarPortion = "-150px";
  if (currentScrollPos < 140) {
    // do not hide if scroll does no pass the header
    return;
  }
  // Hide the logo when in mobile
  if (browserWidth <= 992) {
    hideBarPortion = "-110px";
    // return;
  }
  // this.console.log({ currentScrollPos });
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = hideBarPortion;
  }
  prevScrollpos = currentScrollPos;
};

function animateValue(obj, start = 0, end = null, duration = 3000) {
  if (obj) {
    var textStarting = obj.innerHTML;
    end = end || parseInt(textStarting.replace(/\D/g, ""));

    var range = end - start;
    var minTimer = 50;
    var stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);

    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;

    function commaSeparateNumber(val) {
      while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      }
      return val;
    }

    function run() {
      var now = new Date().getTime();
      var remaining = Math.max((endTime - now) / duration, 0);
      var value = Math.round(end - remaining * range);
      obj.innerHTML = commaSeparateNumber(value);
      if (value == end) {
        clearInterval(timer);
      }
    }

    timer = setInterval(run, stepTime);
    run();
  }
}

var element = document.getElementById("banner-mid");
var elementHeight = element ? element.clientHeight : 0;
document.addEventListener("scroll", animate);

function inView() {
  if (element !== null) {
    var windowHeight = window.innerHeight;
    var scrollY = window.scrollY || window.pageYOffset;
    var scrollPosition = scrollY + windowHeight;
    var elementPosition =
      element.getBoundingClientRect().top + scrollY + elementHeight;
    if (scrollPosition > elementPosition) {
      return true;
    }
  }

  return false;
}

var executed = false;
function animate() {
  if (inView()) {
    if (!executed) {
      executed = true;
      animateValue(document.getElementById("value1"));
      animateValue(document.getElementById("value2"));
      animateValue(document.getElementById("value3"));
    }
  }
}

function showTeam1() {
  var elem1 = document.getElementById("member-slide1");
  var elem2 = document.getElementById("member-slide2");

  elem1.style.display = "block";
  elem2.style.display = "none";
}

function showTeam2() {
  var elem1 = document.getElementById("member-slide1");
  var elem2 = document.getElementById("member-slide2");

  elem2.style.display = "block";
  elem1.style.display = "none";
}

var defaultMenuHeight = 480;
var maxH = 0;
var windowCurrentScrollPosition = 0;
window.addEventListener("scroll", (event) => {
  if (document.getElementsByTagName("html")[0].style.position === "fixed") {
    return;
  }
  windowCurrentScrollPosition = window.scrollY;
});
function toggleMobileMenu(x, h) {
  var logo = document.getElementById("navbar");
  var logoIsHidden = logo.style.top === "-110px";

  var panel = document.getElementById(x),
    maxH = h;
  var slideshowBannerControls =
    document.getElementsByClassName("inner-controls")[0];
  var mobileNav = document.getElementById("mobileNav");
  var mobileMenu = document.getElementById("mobile-menu");

  var subMenu1 = document.getElementById("mobile-subMenu1");
  var subMenu2 = document.getElementById("mobile-subMenu2");
  var activeMenus = document.getElementsByClassName("activemenu");
  var activeLinks = document.getElementsByClassName("activelink");

  if (panel.style.visibility === "visible") {
    panel.style.visibility = "hidden";
    panel.style.opacity = "0";
    if (slideshowBannerControls) {
      slideshowBannerControls.style.setProperty("z-index", 10);
    }
    mobileNav.removeAttribute("style");
    subMenu1.removeAttribute("style");
    subMenu2.removeAttribute("style");
    subMenu1.style.height = 0;
    subMenu2.style.height = 0;
    document.getElementsByTagName("html")[0].style.overflow = "auto";
    document.getElementsByTagName("html")[0].style.width = "auto";
    document.getElementsByTagName("html")[0].style.height = "auto";
    document.getElementsByTagName("html")[0].style.position = "relative";
    console.log(`back to`, { windowCurrentScrollPosition });
    window.scrollTo(0, windowCurrentScrollPosition);
    [...activeMenus].map((activeMenu) =>
      activeMenu.classList.remove("activemenu")
    );
    [...activeLinks].map((activeLink) =>
      activeLink.classList.remove("activelink")
    );
    mobileMenu.removeAttribute("style");
  } else {
    panel.style.visibility = "visible";
    panel.style.opacity = "1";
    if (slideshowBannerControls) {
      slideshowBannerControls.style.setProperty("z-index", -1);
    }
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    document.getElementsByTagName("html")[0].style.width = "100%";
    document.getElementsByTagName("html")[0].style.height = "100%";
    document.getElementsByTagName("html")[0].style.position = "fixed";

    mobileNav.style.height = "65vh";
    mobileNav.style.overflow = "auto";

    mobileMenu.style.height = "100vh";
    mobileMenu.style.backgroundColor = "#ffffff";
  }
}

function toggleMobileSubMenu(x, h) {
  var parentLi = document.getElementById(x).parentElement;
  var panel = document.getElementById(x);
  var mobileNav = document.getElementById("mobileNav");
  const navHeight = x === "mobile-subMenu2" ? "75vh" : "65vh";
  if (parentLi.classList.contains("activemenu")) {
    parentLi.classList.remove("activemenu");
    parentLi.children[0].classList.remove("activelink");
    panel.style.opacity = "0";
    panel.style.visibility = "hidden";
    panel.style.overflow = "hidden";
    panel.style.marginTop = "0px";
    panel.style.height = "0";
  } else {
    parentLi.classList.add("activemenu");
    parentLi.children[0].classList.add("activelink");
    panel.style.marginTop = "20px";
    panel.style.opacity = "1";
    panel.style.visibility = "visible";
    panel.style.height = "auto";
    mobileNav.style.overflow = "auto";
    mobileNav.style.height = "70vh";
    mobileNav.style.paddingBottom = "60px";
  }
}

function closeMobileSubMenu(x, h) {
  var parentLi = document.getElementById(x).parentElement;
  var mobileNav = document.getElementById("mobileNav");
  var panel = document.getElementById(x);

  parentLi.classList.remove("activemenu");
  parentLi.children[0].classList.remove("activelink");
  panel.style.opacity = "0";
  panel.style.visibility = "hidden";
  panel.style.overflow = "hidden";
  panel.style.marginTop = "0px";
  panel.style.height = "0";
}

function showMoreContent(triggerElement, contentIdToToggle) {
  var showContent = document.getElementById(contentIdToToggle);
  showContent.style.display = "block";
  triggerElement.style.display = "none";
}

function showLessContent(triggerElement, contentIdToToggle) {
  var showContent = document.getElementById(contentIdToToggle);
  var readMoreLink = document.getElementsByClassName("read-more-link");
  showContent.style.display = "none";

  for (var ctr = 0; ctr < readMoreLink.length; ctr++) {
    readMoreLink[ctr].style.display = "inline";
  }
}

let teamSliderPosition = 0;
var detectWidth = window.innerWidth || root.clientWidth || body.clientWidth;
let teamShown = detectWidth < 720 ? 1 : 2;
const teamCarousel = document.getElementsByClassName("team-carousel")[0];
const btnTeamCarouselScrollUp = document.getElementById(
  "about-team-scroll-btn-up"
);
const btnTeamCarouselScrollDown = document.getElementById(
  "about-team-scroll-btn-down"
);
const teams = document.getElementsByClassName("team-item-wrapper");
const carouselWrapper = document.getElementsByClassName(
  "team-carousel-wrapper"
)[0];

function aboutUpPageTeamCarouselScroll(scrollDirection) {
  var wrapperDimen = carouselWrapper.getBoundingClientRect();

  if (teamSliderPosition === 0 && scrollDirection === 1) return;
  if (teams.length === teamShown && scrollDirection === 0) return;

  numberOfTeamShowingPerPanel = detectWidth < 720 ? 1 : 1;

  var direction =
    wrapperDimen.width <= 480 ? wrapperDimen.width : wrapperDimen.width / 2;
  if (scrollDirection === 0) {
    // scroll up
    direction *= -1;
    teamShown += numberOfTeamShowingPerPanel;
  } else {
    teamShown -= numberOfTeamShowingPerPanel;
  }

  teamSliderPosition += direction;
  teamCarousel.style.left = teamSliderPosition + "px";

  if (teamSliderPosition === 0) {
    btnTeamCarouselScrollDown.style.backgroundImage =
      "url(../images/about-us-images/arrow-disable.png)";
  } else {
    btnTeamCarouselScrollDown.style.backgroundImage =
      "url(../images/about-us-images/arrow.png)";
  }

  if (teams.length === teamShown) {
    btnTeamCarouselScrollUp.style.backgroundImage =
      "url(../images/about-us-images/arrow-disable.png)";
  } else {
    btnTeamCarouselScrollUp.style.backgroundImage =
      "url(../images/about-us-images/arrow.png)";
  }
}

// /contact Testimonial carousel
(function () {
  const testimonialCarousel = document.getElementById("testimonial-carousel");
  var testimonialsShown = 1;
  if (testimonialCarousel) {
    const testimonialContainer = document.getElementById(
      "testimonial-carousel-container"
    );
    const testimonials = testimonialContainer.getElementsByClassName("item");
    const testimonialContainerDimem =
      testimonialContainer.getBoundingClientRect();
    const totalNumberOfTestimonials = testimonials.length;
    let testimonialSliderPosition = 0;

    function onClickListenerTestimonialLeftScrollListener() {
      testimonialSliderPosition += testimonialContainerDimem.width;
      testimonialCarousel.style.left = testimonialSliderPosition + "px";
      testimonialsShown -= 1;
      activateTestimonialScrollButtons();
    }

    function onClickListenerTestimonialRightScrollListener() {
      testimonialSliderPosition -= testimonialContainerDimem.width;
      testimonialCarousel.style.left = testimonialSliderPosition + "px";
      testimonialsShown += 1;
      activateTestimonialScrollButtons();
    }

    function removeListenerTestimonialScrollButton(btn) {
      const isLeftButton = btn.classList.contains("scroll-left");
      const listener = isLeftButton
        ? onClickListenerTestimonialLeftScrollListener
        : onClickListenerTestimonialRightScrollListener;
      btn.removeEventListener("click", listener);
    }

    function addListenerTestimonialScrollButton(btn) {
      const isLeftButton = btn.classList.contains("scroll-left");
      const listener = isLeftButton
        ? onClickListenerTestimonialLeftScrollListener
        : onClickListenerTestimonialRightScrollListener;
      btn.addEventListener("click", listener);
    }

    function activateTestimonialScrollButtons() {
      const btnsTestimonialScrollLeft = Array.from(
        document.getElementsByClassName("scroll-left")
      );
      const btnsTestimonialScrollRight = Array.from(
        document.getElementsByClassName("scroll-right")
      );

      const disableScrollElement = (btn) => {
        btn.getElementsByTagName("p")[0].style.filter = "opacity(0.2)";
        btn.getElementsByTagName("p")[0].style.cursor = "default";
        removeListenerTestimonialScrollButton(btn);
      };
      const enableScrollElement = (btn) => {
        btn.getElementsByTagName("p")[0].style.filter = "opacity(1)";
        btn.getElementsByTagName("p")[0].style.cursor = "pointer";
        addListenerTestimonialScrollButton(btn);
      };
      if (testimonialsShown === 1) {
        btnsTestimonialScrollLeft.forEach(disableScrollElement);
      } else {
        btnsTestimonialScrollLeft.forEach(enableScrollElement);
      }

      if (testimonialsShown === totalNumberOfTestimonials) {
        btnsTestimonialScrollRight.forEach(disableScrollElement);
      } else {
        btnsTestimonialScrollRight.forEach(enableScrollElement);
      }
    }

    activateTestimonialScrollButtons();
  }
})();

// contact page toggle message/calendar//

const callBackOptionContainer = document.getElementById(
  "callback-option-container"
);
const messageTextArea = document.getElementById("message-text-area");
const chkCallBack = document.getElementById("chkCallBack");

if (callBackOptionContainer) {
  function toggleContactMedium(element) {
    console.log({ element });
    const elId = element.id;
    switch (elId) {
      case "chkMessage":
        if (element.checked) {
          useMessage();
        } else {
          useCallback();
        }
        break;
      case "chkCallBack":
        if (element.checked) {
          useCallback();
        } else {
          useMessage();
        }
        break;
      default:
        break;
    }
  }

  function useCallback() {
    callBackOptionContainer.style.display = "block";
    document.querySelector('input[name="CallbackDate"]').value = "Yes, please.";
    //messageTextArea.style.display = 'none';
  }

  function useMessage() {
    callBackOptionContainer.style.display = "none";
    document.querySelector('input[name="CallbackDate"]').value = "";
    //messageTextArea.style.display = 'block';
  }

  if (window.location.hash.toLowerCase() === "#call-back") {
    useCallback();
    chkCallBack.checked = true;
  }
}

// welcome page layout
(function () {
  const fixWelcomeSectionHeight = () => {
    var detectWidth = window.innerWidth || root.clientWidth || body.clientWidth;
    const parentBox = document.getElementById("instruction-section");
    const childBox1 = document.getElementById("black-box");
    const childBox2 = document.getElementById("instruction-box");
    if (parentBox !== null) {
      if (detectWidth <= 768) {
        parentBox.style.height = "auto";
        return;
      }
      const parentBoxHeight = parentBox.offsetHeight;
      const childBox1Height = childBox1.offsetHeight;
      const childBox2Height = childBox2.offsetHeight;
      var highestHeight =
        childBox1Height > childBox2Height ? childBox1Height : childBox2Height;
      if (highestHeight === childBox2Height) {
        highestHeight += 80;
      }
      parentBox.style.height = highestHeight + "px";
    }
  };

  window.addEventListener("load", fixWelcomeSectionHeight);
  window.addEventListener("resize", fixWelcomeSectionHeight);

  const instScrollTrigger = document.getElementById("ins-pane-trigger");
  const instructionBox = document.getElementById("instruction-box");
  if (instScrollTrigger) {
    instScrollTrigger.addEventListener("click", () => {
      window.scrollBy({
        top: instructionBox.getBoundingClientRect().top,
        left: 0,
        behavior: "smooth",
      });
    });
  }
})();
