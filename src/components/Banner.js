import React from 'react'

const Banner = () =>
{
    var slideIndex = 1;
    var bannerInterval;

    slideBannerNow();

    function slideBannerNow() {
      bannerInterval = setInterval(slideBannerAuto, 5000);
    }

    function stopBanner() {
      clearInterval(bannerInterval);
    }

    function slideBannerAuto() {
      showSlides((slideIndex += 1));
    }

    function plusSlides(n) {
      showSlides((slideIndex += n));
    }

    function currentSlide(n) {
      showSlides((slideIndex = n));
    }

    function showSlides(n) {
      var i;
      var x = document.getElementsByClassName("bannerSlides");
      var dots = document.getElementsByClassName("dot");
      if (n > x.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = x.length;
      }
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      if (typeof x[slideIndex - 1] !== "undefined") {
        x[slideIndex - 1].style.display = "block";
      }
      if (typeof dots[slideIndex - 1] !== "undefined") {
        dots[slideIndex - 1].className += " active";
      }
    }

    /*** Team Slider ***/
    var listEl = document.querySelector(".team-slider-grid");
    var btnLeftEl = document.querySelector(".btn-prev");
    var btnRightEl = document.querySelector(".btn-next");
    var disBtnPrev = document.getElementById("teamprevdisabled");
    var disBtnNext = document.getElementById("teamnextdisabled");

    count = 0;
    var detectWidth = window.innerWidth || root.clientWidth || body.clientWidth;
    if (btnLeftEl && btnRightEl) {
      btnLeftEl.addEventListener("click", function (e) {
        count++;
        var widthScroll = getScrollPercentage();
        listEl.style.left = count * widthScroll + "%";

        var cardShowing = detectWidth <= 1024 ? -12 : -11;
        if (count > cardShowing) {
          btnRightEl.style.display = "block";
          disBtnNext.style.display = "none";
        }
        if (count >= 0) {
          btnLeftEl.style.display = "none";
          disBtnPrev.style.display = "block";
        }
      });
      btnRightEl.addEventListener("click", function (e) {
        count--;
        var widthScroll = getScrollPercentage();
        listEl.style.left = count * widthScroll + "%";

        var cardShowing = detectWidth <= 1024 ? -11 : -11;
        if (count < 0) {
          btnLeftEl.style.display = "block";
          disBtnPrev.style.display = "none";
        }
        if (count <= cardShowing) {
          btnRightEl.style.display = "none";
          disBtnNext.style.display = "block";
        }
      });
    }

    window.addEventListener("resize", function (event) {
      var detectWidth =
        window.innerWidth || root.clientWidth || body.clientWidth;
      if (detectWidth <= 1024) {
        widthScroll = 34;
      } else {
        widthScroll = 25;
      }
    });

    function getScrollPercentage() {
      var detectWidth =
        window.innerWidth || root.clientWidth || body.clientWidth;
      if (detectWidth <= 1024) {
        return 34;
      } else {
        return 25;
      }
    }

    function aboutUpPageTeamCarouselScroll(scrollDirection) {
      var showTop = scrollDirection === 0 ? "0px" : "-1178px";
      const teamCarousel = document.getElementsByClassName("team-carousel")[0];
      console.log("aboutUpPageTeamCarouselScroll", { showTop, teamCarousel });
      teamCarousel.style.top = showTop;
    }

  return (


<div id="banner">
    <div id="banner-slider" onmouseover="stopBanner()" onmouseout="slideBannerNow()">
        <!-- <div id="banner-slider1"> -->
<div class="slideshow-container">
    <div class="bannerSlides fade" style="display: block">
        <picture>
            <source srcset="https://www.securecash.com.au/images/banner/Slide-1-mobile.jpg"
                media="(max-width: 480px)" />
            <source srcset="https://www.securecash.com.au/images/banner/Slide-1-tablet.jpg"
                media="(max-width: 768px)" />
            <img src="https://www.securecash.com.au/images/banner/Slide-1-web.jpg" alt="" />
        </picture>
        <div class="inner">
            <div class="text">
                <hr class="divider-2 divider-white" />
                <h3 class="prata">Let Us Do Your Banking,</h3>
                <h1 class="montSemi">Don't Take The Risk!</h1>
                <p>Anywhere. Anytime. Australia Wide.</p>
                <a href="#welcome" class="btn-wrapper">
                    <div class="d-btn btn-learn-more">
                        <p>Learn More</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div class="bannerSlides fade">
        <picture>
            <source srcset="https://www.securecash.com.au/images/banner/Slide-2-mobile.jpg"
                media="(max-width: 480px)" />
            <source srcset="https://www.securecash.com.au/images/banner/Slide-2-tablet.jpg"
                media="(max-width: 768px)" />
            <img src="https://www.securecash.com.au/images/banner/Slide-2-web.jpg" alt="" />
        </picture>
        <div class="inner">
            <div class="text">
                <hr class="divider-2 divider-white" />
                <h3 class="prata">Start Taking Advantage Of Our Services Today</h3>
                <h1 class="montSemi">Get A Quote From SecureCash</h1>
                <p>We Just Need A Few Details!</p>
                <a href="https://www.securecash.com.au/quote/" class="btn-wrapper">
                    <div class="d-btn btn-learn-more">
                        <p>Get a Quote</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div class="bannerSlides fade">
        <picture>
            <source srcset="https://www.securecash.com.au/images/banner/Slide-3-mobile.jpg"
                media="(max-width: 480px)" />
            <source srcset="https://www.securecash.com.au/images/banner/Slide-3-tablet.jpg"
                media="(max-width: 768px)" />
            <img src="https://www.securecash.com.au/images/banner/Slide-3-web.jpg" alt="" />
        </picture>
        <div class="inner">
            <div class="text home-hero--bannerslides-3__text">
                <hr class="divider-2 divider-white" />
                <h3 class="prata">We're Pushing Our Industry Into The Future</h3>
                <h1 class="montSemi">Take Advantage Of Our eDockets System</h1>
                <p>Control Your Services With A Click Of A Button</p>
                <a href="https://www.edockets.app/" target="_blank" class="btn-wrapper">
                    <div class="d-btn btn-learn-more">
                        <p>Learn More</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div class="bannerSlides fade">
        <picture>
            <source srcset="https://www.securecash.com.au/images/banner/Slide-4-mobile.jpg"
                media="(max-width: 480px)" />
            <source srcset="https://www.securecash.com.au/images/banner/Slide-4-tablet.jpg"
                media="(max-width: 768px)" />
            <img src="https://www.securecash.com.au/images/banner/Slide-4-web.jpg" alt="" />
        </picture>
        <div class="inner">
            <div class="text">
                <hr class="divider-2 divider-white" />
                <h3 class="prata">Our Services Are Covert</h3>
                <h1 class="montSemi">We Don't Attract Unwanted Attention</h1>
                <p>A Safer Solution For Your Business</p>
                <a href="https://www.securecash.com.au/about-us/#about-us-section-service" class="btn-wrapper">
                    <div class="d-btn btn-learn-more">
                        <p>Learn More</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div class="bannerSlides fade">
        <picture>
            <source srcset="https://www.securecash.com.au/images/banner/Slide-5-mobile.jpg"
                media="(max-width: 480px)" />
            <source srcset="https://www.securecash.com.au/images/banner/Slide-5-tablet.jpg"
                media="(max-width: 768px)" />
            <img src="https://www.securecash.com.au/images/banner/Slide-5-web.jpg" alt="" />
        </picture>
        <div class="inner">
            <div class="text home-hero--bannerslides-5__text">
                <hr class="divider-2 divider-white" />
                <h3 class="prata">Use A Provider You Can Trust</h3>
                <h1 class="montSemi">We have Been Operating Over 25 Years</h1>
                <p>Our Managers Have Over 100 Years Combined Industry Experience</p>
                <a href="https://www.securecash.com.au/about-us/" class="btn-wrapper">
                    <div class="d-btn btn-learn-more">
                        <p>About Us</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
<div class="inner-controls">
    <div class="dot-navigation">
        <ul>
            <li><span class="dot active" onclick="currentSlide(1)"></span></li>
            <li><span class="dot" onclick="currentSlide(2)"></span></li>
            <li><span class="dot" onclick="currentSlide(3)"></span></li>
            <li><span class="dot" onclick="currentSlide(4)"></span></li>
            <li><span class="dot" onclick="currentSlide(5)"></span></li>
        </ul>
    </div>
</div>    </div>

    <div class="inner">
        <div id="banner-info">
            <div class="mid-row">
                <i class="fa fa-phone"></i><span>&nbsp;&nbsp;&nbsp;&nbsp;Ask Us Anything
                    <a href="tel:1300732873">1300 SECURE</a></span>
            </div>
            <div class="mid-row email-desktop">
                <i class="fa fa-envelope"></i>
                <span>&nbsp;&nbsp;For Quotes and Enquiries&nbsp;
                    <a href="mailto:customers@securecash.com.au">customers@securecash.com.au</a>
                </span>
            </div>
            <div class="mid-row email-mobile">
                <i class="fa fa-envelope"></i><span>&nbsp;&nbsp;<a
                        href="mailto:customers@securecash.com.au">customers@securecash.com.au</a></span>
            </div>
            <div class="mid-row">
                <i class="fa fa-users"></i><span>&nbsp;&nbsp;Learn More <a
                        href="https://www.securecash.com.au/about-us/">About us</a></span>
            </div>
        </div>
    </div>
</div>  )
}

export default Banner