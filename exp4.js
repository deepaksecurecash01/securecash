import Divider from '@/components/common/Divider';
import Container from '@/components/layout/Container';
import React from 'react';

const BlogHeroSection = ({ title, date, blogIndex }) =>
{
    return (
        <section className="blog-single-hero mb-[32px] bg-black text-white h-full  768px:mb-[44px] relative">
            <Container className="w-full">
                <div className="blog-single-hero--wrap flex items-center relative">
                    <div className="blog-single-hero--head h-[290px] p-0 max-w-[900px] mx-auto flex flex-col justify-center items-center  768px:h-[340px]">
                        <h1 className="blog-single-hero--head__title blog-index-hero--content__title text-[28px] leading-[34px] px-[10px] w-full  480px:text-[38px]  480px:leading-[36px]  480px:px-[40px] 768px:px-0 mb-[20px] text-center  768px:text-[46px] font-extrabold  768px:leading-[50px] capitalize  480px:w-[590px]">{title}</h1>
                        <Divider color="primary" margin="mt-[6px] mb-[16px]" alignment="left" responsiveClassName="992px:mx-0 992px:text-left" />
                        <div className="blog-index-hero--content__subtitle italic mb-0">
                            <p className="blog-meta--title">{date}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>);
};

export default BlogHeroSection;