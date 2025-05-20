import React from 'react'

const page = () =>
{
    // Contact us map

    const Coordinates = [
        { lat: -31.083332, lng: 150.916672 }, // Tamworth, NSW, Australia
        { lat: -32.916668, lng: 151.75 }, // Newcastle, NSW, Australia
        { lat: -34.754723, lng: 149.618607 }, // Lithgow, NSW, Australia
        { lat: -34.754723, lng: 149.618607 }, // Goulburn, NSW, Australia
        { lat: -32.256943, lng: 148.601105 }, // Dubbo, NSW, Australia
        { lat: -31.956667, lng: 141.467773 }, // Broken Hill, NSW, Australia
        { lat: -30.5, lng: 151.649994 }, // Armidale, NSW, Australia
        { lat: -31.747, lng: 115.803001 }, // Wanneroo, WA, Australia
        { lat: -20.736, lng: 116.846001 }, // Karratha, WA, Australia
        { lat: -20.736, lng: 116.846001 }, // Karratha, WA, Australia
        { lat: -32.528889, lng: 115.723053 }, // Mandurah, WA, Australia
        { lat: -30.74889, lng: 121.465836 }, // Kalgoorlie, WA, Australia
        { lat: -33.647778, lng: 115.345833 }, // Busselton, WA, Australia
        { lat: -35.022778, lng: 117.881386 }, // Albany, WA, Australia
        { lat: -38.383331, lng: 142.483337 }, // Warrnambool, VIC, Australia
        { lat: -35.333332, lng: 143.550003 }, // Swan Hill, VIC, Australia
        { lat: -38.099998, lng: 147.066666 }, // Sale, VIC, Australia
        { lat: -38.233334, lng: 146.399994 }, // Latrobe City, VIC, Australia
        { lat: -36.716667, lng: 142.199997 }, // Horsham, VIC, Australia
        { lat: -38.150002, lng: 144.350006 }, // Geelong, VIC, Australia
        { lat: -38.133331, lng: 145.116669 }, // Frankston, VIC, Australia
        { lat: -37.549999, lng: 143.850006 }, // Ballarat, VIC, Australia
        { lat: -36.551945, lng: 145.981674 }, // Benalla, VIC, Australia
        { lat: -37.833332, lng: 147.616669 }, // Bairnsdale, VIC, Australia
        { lat: -37.283333, lng: 142.916672 }, // Ararat, VIC, Australia
        { lat: -41.180557, lng: 146.34639 }, // Devonport, Tasmania, Australia
        { lat: -41.06361, lng: 145.875275 }, // Burnie, Tasmania, Australia
        { lat: -42.880554, lng: 147.324997 }, // Hobart, Tasmania, Australia
        { lat: -33.033333, lng: 137.566666 }, // Whyalla, SA, Australia
        { lat: -35.549999, lng: 138.616669 }, // Victor Harbor, SA, Australia
        { lat: -33.185833, lng: 138.016937 }, // Port Pirie, SA, Australia
        { lat: -34.846111, lng: 138.503052 }, // Port Adelaide, SA, Australia
        { lat: -35.117001, lng: 139.266998 }, // Murray Bridge, SA, Australia
        { lat: -19.307222, lng: 146.731674 }, // Thuringowa, QLD, Australia
        { lat: -27.566668, lng: 151.949997 }, // Toowoomba, QLD, Australia
        { lat: -23.375, lng: 150.511673 }, // Rockhampton, QLD, Australia
        { lat: -21.144337, lng: 149.186813 }, // Mackay, QLD, Australia
        { lat: -24.85, lng: 152.350006 }, // Bundaberg, QLD, Australia
        { lat: -12.480556, lng: 130.983063 }, // Palmerston, Northern Territory, Australia
        { lat: -26.65, lng: 153.066666 }, // Sunshine Coast, Queensland, Australia
        { lat: -34.92123, lng: 138.599503 }, // Adelaide, SA, Australia
        { lat: -41.429825, lng: 147.157135 }, // Launceston, TAS, Australia
        { lat: -19.258965, lng: 146.816956 }, // Townsville City, QLD, Australia
        { lat: -16.925491, lng: 145.75412 }, // Cairns City, QLD, Australia
        { lat: -34.206841, lng: 142.13649 }, // Mildura, VIC, Australia
        { lat: -30.296276, lng: 153.114136 }, // Coffs Harbour, NSW, Australia
        { lat: -36.757786, lng: 144.278702 }, // Bendigo, VIC, Australia
        { lat: -36.08078, lng: 146.916473 }, // Albury, NSW, Australia
        { lat: -12.462827, lng: 130.841782 }, // Darwin, Northern Territory, Australia
        { lat: -27.470125, lng: 153.021072 }, // Brisbane, QLD, Australia
        { lat: -23.843138, lng: 151.268356 }, // Gladstone QLD, Australia
        { lat: -37.824429, lng: 140.783783 }, // Mount Gambier, SA, Australia
        { lat: -33.865143, lng: 151.2099 }, // Sydney, NSW, Australia
        { lat: -37.0201, lng: 144.9646 }, // Victoria, Australia
        { lat: -19.491411, lng: 132.550964 }, // Northern Territory, Australia
        { lat: -30.000233, lng: 136.209152 }, // South Australia, Australia
        { lat: -25.760321, lng: 122.805176 }, // Western Australia, Australia
        { lat: -20.917574, lng: 142.702789 }, // Queensland, Australia
        { lat: -31.840233, lng: 145.612793 }, // New South Wales, Australia
        { lat: -37.683334, lng: 176.166672 }, // Tauranga, North Island, New Zealand
        { lat: -38.685692, lng: 176.070206 }, // Taupo, New Zealand
        { lat: -41.270634, lng: 173.283966 }, // Nelson, New Zealand
        { lat: -41.209164, lng: 174.908051 }, // Lower Hutt, New Zealand
        { lat: -43.52565, lng: 172.639847 }, // Christchurch, Canterbury, New Zealand
        { lat: -36.746212, lng: 174.737122 }, // Rosedale, Auckland, New Zealand
        { lat: -39.62154, lng: 176.784073 }, // Flaxmere, Hastings, New Zealand
        { lat: -42.406418, lng: 171.691162 }, // West Coast, New Zealand
        { lat: -45.004103, lng: 168.806644 }, // Queenstown Lakes District
        { lat: -46.340964, lng: 168.418626 }, // South Land
        { lat: -45.783932, lng: 170.612934 }, // Dunedin City Otago, New Zealand
        { lat: -28.169287, lng: 153.53363 }, // Kirra, Coolangatta QLD, Australia
        { lat: -33.833569, lng: 138.610001 }, // Clare Valley, Clare SA, Australia
        { lat: -16.900728, lng: 145.738388 }, // Edge Hill, QLD, Australia
        { lat: -35.306179, lng: 149.126419 }, // Capital Hill, ACT, Australia
        { lat: -34.688404, lng: 135.909932 }, // Port Lincoln
        { lat: -28.777989, lng: 114.62265 }, // Geraldton, Western Australia 6530, Australia
        { lat: -23.693652, lng: 133.892037 }, // Northern Territory 0870, Australia
        { lat: -20.725378, lng: 139.493595 }, // 86 Camooweal St Mount Isa QLD 4825, Australia
    ];

    function getDefaultCenterPosition()
    {
        var centerPosition = {
            zoom: 4,
            center: { lat: -31, lng: 153 },
        };
        var detectWidth = window.innerWidth || root.clientWidth || body.clientWidth;
        if (detectWidth <= 375) {
            centerPosition = {
                zoom: 2.7,
                center: { lat: -31, lng: 146 },
            };
        } else if (detectWidth <= 414) {
            centerPosition = {
                zoom: 3,
                center: { lat: -31, lng: 146 },
            };
        } else if (detectWidth <= 667) {
            centerPosition = {
                zoom: 3,
                center: { lat: -31, lng: 146 },
            };
        } else if (detectWidth <= 768) {
            centerPosition = {
                zoom: 4,
                center: { lat: -31, lng: 146 },
            };
        } else if (detectWidth <= 1024) {
            centerPosition = {
                zoom: 4,
                center: { lat: -31, lng: 145 },
            };
        } else {
            centerPosition = {
                zoom: 4,
                center: { lat: -31, lng: 153 },
            };
        }

        return centerPosition;
    }

    Asset = document.createElement("script");
    Asset.type = "text/javascript";
    Asset.charset = "utf-8";
    Asset.async = true;
    Asset.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAoDwTTSDtafFJrNeRrb75k8WXBrYzJX38&callback=initMap&libraries=&v=weekly";
    document.head.appendChild(Asset);

    function initMap()
    {
        const Map = new google.maps.Map(
            document.getElementById("mapContainer"),
            getDefaultCenterPosition()
        );

        Coordinates.forEach((Coords) =>
        {
            new google.maps.Size(12, 24);
            new google.maps.Marker({ position: Coords, map: Map });
        });
    }
  
  return (
      <>
          <div className="contact-page" id="hero-image"
              style={{ backgroundImage: "url('https://www.securecash.com.au/images/contact-page/Header-Image.png')" }}
              data-mce-style="background-image: url('https://www.securecash.com.au/images/contact-page/Header-Image.png');">
              <div className="featured"><img src="https://www.securecash.com.au/images/contact-page/Header-Image.png"
                  alt="SecureCash Australia Cash in Transit Services"
                  data-mce-src="https://www.securecash.com.au/images/contact-page/Header-Image.png" /></div>
              <div className="wrapper">
                  <h3 className="text-white montBold">Get a Reply Back</h3>
                  <h1 className="text-white montBold">Within 45 Minutes</h1>
                  <hr className="divider-2 divider-gold" />
                  <p><strong>No problem is too big or too small, our team is here to make sure your services go as plan. Simply
                      select the team you need help from and we will get back to you in a timely manner. You can always call
                      us on <a href="tel:1300732873" data-mce-href="tel:1300732873">1300 SECURE</a> if it is more convenient
                      for you!</strong></p>
              </div>
          </div>
          <p>%%Form--Contact%%</p>
          <section className="contact-testimonial">
              <div className="inner">
                  <div className="contact-testimonial--title-wrap">
                      <h3>Testimonials</h3>
                      <hr className="divider-2 divider-gold" />
                      <p>Don't just take our word for it. <br />Hear what our customers have to say about our services!</p>
                  </div>
                  <div className="contact-testimonial--carousel">
                      <ul className="bullet-dots-container">
                          <li className="bullet-dot active-dot"></li>
                          <li className="bullet-dot"></li>
                          <li className="bullet-dot"></li>
                          <li className="bullet-dot"></li>
                          <li className="bullet-dot"></li>
                          <li className="bullet-dot"></li>
                          <li className="bullet-dot"></li>
                          <li className="bullet-dot"></li>
                      </ul>
                      <div className="contact-testimonial--carousel-container">
                          <div className="contact-testimonial--carousel__items">
                              <div className="carousel-item">
                                  <div className="excerpt">
                                      <p>It makes sense for us to use SecureCash for our cash floats, cash pick-up and cash
                                          counting needs during the adelaide festival. It allowed us to concentrate on our core
                                          business in the midst of the Festival.</p>
                                  </div>
                              </div>
                              <div className="carousel-item">
                                  <div className="excerpt">
                                      <p>The service is extremely discreet, punctual, safe and above all courteous. We wish we had
                                          switched to SecureCash years ago, and I would have no hesitation in recommending their
                                          services to anyone looking for an efficient banking solution.</p>
                                  </div>
                              </div>
                              <div className="carousel-item">
                                  <div className="excerpt">
                                      <p>Having used SecureCash at a number of sites for banking collections, I would thoroughly
                                          recommend them. The other advantage is that we gain our working days back by not
                                          travelling to and from the bank or waiting in queues - that alone is worth it.</p>
                                  </div>
                              </div>
                              <div className="carousel-item">
                                  <div className="excerpt">
                                      <p>I am very happy with the service provided by SecureCash; I find the staff to be helpful
                                          and courteous at all times and I would highly recommend their organisation to anyone who
                                          is looking for a good cash in transit service.</p>
                                  </div>
                              </div>
                              <div className="carousel-item">
                                  <div className="excerpt">
                                      <p>We are very happy with the service, it's always on time and the friendly staff go out of
                                          their way to give great service. SecureCash saves our company a lot of time by going to
                                          the bank for us, and they even take our cheques to the bank to deposit them for us.</p>
                                  </div>
                              </div>
                              <div className="carousel-item">
                                  <div className="excerpt">
                                      <p>Councils don't normally give testimonials, however I would like to advise that I have
                                          always found SecureCash staff to be very accommodating and professional and that our
                                          current arrangement is working well.</p>
                                  </div>
                              </div>
                              <div className="carousel-item">
                                  <div className="excerpt">
                                      <p>We were unsure we even needed this type of service, as we did our own banking. We used
                                          the code J9#FREEMONEY, and we received 2 weeks free, just to try out the service and see
                                          if it was for us. We never looked back and 6 years on we are still with SecureCash</p>
                                  </div>
                              </div>
                              <div className="carousel-item">
                                  <div className="excerpt">
                                      <p>We are extremely satisfied with our change to SecureCash. They are always willing to
                                          oblige, and using this service ensures safe banking and saves us a lot of valuable time.
                                          We would recommend them to any prospective client.</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="contact-testimonial--carousel-control">
                          <div className="carousel-control-left"><i className="fa fa-chevron-left"></i><br /></div>
                          <div className="carousel-control-divider">&nbsp;</div>
                          <div className="carousel-control-right"><i className="fa fa-chevron-right"></i><br /></div>
                      </div>
                  </div>
              </div>
          </section>
          <div id="map-section">
              <div id="mapContainer">
                  <div style={{
                      position: "relative", width: "100%", height: "100%", overflow: "hidden",
                      WebkitTapHighlightColor: "transparent"
                  }}
                      data-mce-style="position: relative; width: 100%; height: 100%; overflow: hidden; -webkit-tap-highlight-color: transparent;">
                      <div style={{ zIndex: "0", width: "100%", height: "100%", position: "absolute" }}
                          data-mce-style="z-index: 0; width: 100%; height: 100%; position: absolute;">
                          <div style={{
                              position: "absolute", height: "100%", width: "100%", zIndex: "0",
                              backgroundColor: "transparent"
                          }}
                              data-mce-style="position: absolute; height: 100%; width: 100%; z-index: 0; background-color: transparent;">
                              <canvas width="1903" height="500" style={{
                                  position: "absolute", top: "0px", left: "0px", width: "1903px",
                                  height: "500px", backgroundColor: "#ffffff"
                              }}
                                  data-mce-style="position: absolute; top: 0px; left: 0px; width: 1903px; height: 500px; background-color: #ffffff;" />
                              <div style={{ position: "absolute", width: "1903px", height: "500px", zIndex: "0" }}
                                  data-mce-style="position: absolute; width: 1903px; height: 500px; z-index: 0;"><br /></div>
                          </div>
                      </div>
                      <div className="H_imprint" style={{
                          position: "absolute", bottom: "0px", right: "0px", left: "0px", zIndex: "1"
                          , direction: "ltr", pointerEvents: "none", userSelect: "none",
                          font: "11px 'Lucida Grande', Arial, Helvetica, sans-serif"
                      }}
                          data-mce-style="position: absolute; bottom: 0px; right: 0px; left: 0px; z-index: 1; direction: ltr; pointer-events: none; user-select: none; font: 11px 'Lucida Grande', Arial, Helvetica, sans-serif;">
                          <div className="H_logo" style={{ margin: "0px 0px 16px 16px", display: "inline-block" }}
                              data-mce-style="margin: 0px 0px 16px 16px; display: inline-block;"><svg height="40" viewBox="0 0 47 40"
                                  width="47" xmlns="http://www.w3.org/2000/svg">
                                  <g fill="none" fillRule="evenodd">
                                      <path
                                          d="m45.2054149 8.82876345.6003191.40637037-.2240425.6914074-.4490426 1.38570368c-.1024468.3148889-.6998936 1.9596297-2.43 3.5918519l-.017234.0163704c-.188617.1887407-.3801064.3659259-.5467021.5084444l-.4605319.4285185-.486383.4516296-.1407447-.0702963c-.7257447.4583704-1.4926596.7886667-2.2796809.9831852l.5840426.5864445-.6769149.6817778-2.052766 2.0636296-.169468.1704444-.019149.0192593-2.3821276 2.3958518c-.4902128.8493334-1.1202128 1.6331852-1.8497873 2.3111112-.6031915.6047407-1.2504255 1.1054814-1.935 1.4954814l-.4777659.4805186-4.3247873 4.3506666-.0296808.0298519-.0315958.0269629-2.1532978 1.8171111-.2661702.2253334h-.3485107-3.8948936l-3.968617 3.9914815-1.3547873 1.3616296-.6769148.6808148-.6769149-.6808148-1.3538298-1.3616296-4.80925535-4.837926-3.2687234-3.2875555-1.63436171-1.6437778h2.3112766 4.62255319 2.67223407l-4.71063832-4.7368148-.6769149-.6808148.6769149-.6808148 4.93851062-4.9650371.6769149-.6798518.6769149.6808148 2.7296809 2.7454074c.9363829-.8820741 2.1485106-1.4685185 3.4037234-1.6562963.278617-1.4694815 1.0187234-2.834963 2.168617-3.9885926.5696808-.572 1.1843617-1.0438519 1.8335106-1.4107407l.2901064-.2917778 4.3094681-4.31985187c.5830851-1.0582963 1.4256383-1.78918519 2.0364893-2.12718519l.4471277-.24748148c.3829787-.7617037.9047872-1.47622222 1.5539362-2.12622222 1.510851-1.51666667 3.3165957-2.31881482 5.22-2.31881482.0871276 0 .1752127.00192593.2594681.00577778 1.9484042.06933334 3.8441489.97933334 5.4775532 2.62792593.1512765.15022222.3303191.34859259.5361702.5797037l.0526595.05874074c.1120213.12518519.2345745.26192593.370532.40733334l1.2657446 1.36066666.6328724.67985185-.6548936.65866667-.2508511.25325926zm-27.9288192 22.17414815h-9.57446804l4.78723404 4.8148148zm23.1864894-21.70422223c-.9220213 1.38666663-2.5180851 3.63037033-4.1984042 1.94133333l4.2510638-4.27651851c-.3810638-.41022222-.6711702-.754-.8923404-.97740741-2.2921277-2.31207407-4.8743617-2.34192593-6.8984043-.312-1.3528723 1.35681481-1.7071277 2.91007407-1.313617 4.38533332l-1.332766-1.52629628c-.385851.21474074-2.0182979 1.65918518-.7937234 3.84703708l-1.5252127-1.274963-2.0240426 2.0299259 2.7344681 2.7502222c-2.1121277-1.6861481-4.3889362-1.5205185-6.2157447.312-1.9560638 1.9615556-1.8181915 4.3381482-.3532979 6.293926l-.295851-.2946667c-1.9321277-1.9432593-4.0318085-1.2576296-5.0706383-.2128148-.8023405.8079259-1.2944681 1.9191852-1.0924468 2.6905185l-4.195532-4.2187407-2.22893613 2.2408148 8.25893613 8.3065185h4.4339362l-2.9767021-2.9938519c-.5893908-.6029568-.9604155-1.0987731-1.1531529-1.5232627-.3182349-.7008886-.1504161-1.2073234.3230465-1.680515.7334043-.7318519 1.583617-.2763704 3.0829787 1.2277777l2.9412766 2.9562963 2.2164894-2.2292592-2.7909575-2.8060741c2.0125532 1.5291852 4.4224468 1.612 6.5728724-.545037 1.3567021-1.2653334 1.7425532-2.4565185 1.7425532-2.4565185l-1.6755319-1.1314815c-.9229788 1.3866666-2.5152128 3.6361481-4.195532 1.9461481l4.2606383-4.2851852 2.655 2.6712593 2.3160639-2.3294074-3.3223405-3.3424445c-1.5520212-1.5609629-.6328723-3.0275555.0124469-3.5793333.3025531.6442222.7448936 1.2624445 1.3078723 1.8296296 2.1485106 2.1676297 4.9260638 2.6038519 7.3685106.1550371 1.3567022-1.2643704 1.7425532-2.4565185 1.7425532-2.4565185zm-3.6564894-1.35537321-2.0211702 2.03377777c-.9890425-1.18251851-.9392553-1.81422222-.3245744-2.43051851.7439361-.7462963 1.4993617-.43044445 2.3457446.39674074zm-12.4879787 12.56088884c-.9890425-1.1825185-.9411702-1.819037-.3284042-2.4353333.7448936-.7462963 1.5003191-.4304444 2.3467021.3967408z"
                                          fill="#0f1621" fillOpacity=".7" style={{ fill: "#ffffff", fillOpacity: "0.6" }}
                                          data-mce-style="fill: #ffffff; fill-opacity: 0.6;"></path>
                                      <path
                                          d="m17.2765957 31.0029116-4.787234 4.8148148-4.78723404-4.8148148zm23.1864894-21.70422223 1.6755319 1.13148153s-.385851 1.1921481-1.7425532 2.4565185c-2.4424468 2.4488148-5.22 2.0125926-7.3685106-.1550371-.5629787-.5671851-1.0053192-1.1854074-1.3078723-1.8296296-.6453192.5517778-1.5644681 2.0183704-.0124469 3.5793333l3.3223405 3.3424445-2.3160639 2.3294074-2.655-2.6712593-4.2606383 4.2851852c1.6803192 1.69 3.2725532-.5594815 4.195532-1.9461481l1.6755319 1.1314815s-.3858511 1.1911851-1.7425532 2.4565185c-2.1504256 2.157037-4.5603192 2.0742222-6.5728724.545037l2.7909575 2.8060741-2.2164894 2.2292592-2.9412766-2.9562963c-1.4993617-1.5041481-2.3495744-1.9596296-3.0829787-1.2277777-.4734626.4731916-.6412814.9796264-.3230465 1.680515.1927374.4244896.5637621.9203059 1.1531529 1.5232627l2.9767021 2.9938519h-4.4339362l-8.25893613-8.3065185 2.22893613-2.2408148 4.195532 4.2187407c-.2020213-.7713333.2901063-1.8825926 1.0924468-2.6905185 1.0388298-1.0448148 3.1385106-1.7304445 5.0706383.2128148l.295851.2946667c-1.4648936-1.9557778-1.6027659-4.3323704.3532979-6.293926 1.8268085-1.8325185 4.103617-1.9981481 6.2157447-.312l-2.7344681-2.7502222 2.0240426-2.0299259 1.5252127 1.274963c-1.2245745-2.1878519.4078724-3.63229634.7937234-3.84703708l1.332766 1.52629628c-.3935107-1.47525925-.0392553-3.02851851 1.313617-4.38533332 2.0240426-2.02992593 4.6062766-2.00007407 6.8984043.312.2211702.22340741.5112766.56718519.8923404.97740741l-4.2510638 4.27651851c1.6803191 1.689037 3.2763829-.5546667 4.1984042-1.94133333zm-16.1444681 11.20551563 2.0182979-2.0385925c-.846383-.8271852-1.6018085-1.1430371-2.3467021-.3967408-.612766.6162963-.6606383 1.2528148.3284042 2.4353333zm12.4879787-12.56088884c-.8463829-.82718519-1.6018085-1.14303704-2.3457446-.39674074-.6146809.61629629-.6644681 1.248.3245744 2.43051851z"
                                          fill="#fff" fillOpacity=".3" style={{ fill: "#0f1621", fillOpacity: "0.3" }}
                                          data-mce-style="fill: #0f1621; fill-opacity: 0.3;"></path>
                                  </g>
                              </svg><br /></div>
                          <div className="H_copyright" style={{
                              right: "0px", bottom: "0px", position: "absolute",
                              backgroundColor: "rgba(255, 255, 255, 0.8)", color: "#0f1621", padding: "2px 16px"
                          }}
                              data-mce-style="right: 0px; bottom: 0px; position: absolute; background-color: rgba(255, 255, 255, 0.8); color: #0f1621; padding: 2px 16px;">
                              <a target="_blank" href="https://legal.here.com/en/terms/serviceterms/us" style={{
                                  color: "inherit",
                                  margin: "0px 8px", textDecoration: "none", pointerEvents: "all"
                              }} rel="noopener"
                                  data-mce-href="https://legal.here.com/en/terms/serviceterms/us"
                                  data-mce-style="color: inherit; margin: 0px 8px; text-decoration: none; pointer-events: all;">Terms
                                  of use</a><span style={{ margin: "0px 8px" }} data-mce-style="margin: 0px 8px;">© 1987–2020
                                      HERE</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div>%%Company%%</div>
          <div>%%Footer%%</div>
    </>
  )
}

export default page