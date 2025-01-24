<div className="relative w-full">
  <Slider className="relative" ref={sliderRef} {...settings}>
    {slides.map((slide, index) => (
      <div key={index} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-700" />
        <picture className="w-full h-full">
          <source media="(min-width: 1200px)" srcSet={slide.web} />
          <source media="(min-width: 768px)" srcSet={slide.tablet} />
          <source media="(max-width: 480px)" srcSet={slide.mobile} />
          <Image
            width={1200}
            height={800}
            alt={slide.alt || "Banner Image"}
            src={slide.mobile}
            priority
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
            className="w-full h-[480px] 414px:h-[490px] 768px:h-[600px] 1280px:h-[800px] object-cover"
          />
        </picture>
        <Container className="relative z-10">
          <BannerContent {...slide} />
        </Container>
      </div>
    ))}
  </Slider>
</div>;
