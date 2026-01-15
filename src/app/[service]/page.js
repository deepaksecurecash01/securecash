import BottomBanner from "@/components/common/BottomBanner";
import SectionWrapper from "./components/SectionWrapper";
import HeroImage from "./components/HeroImage";
import { servicesData } from "@/data/servicesData";
import VideoSection from "@/components/common/VideoSection";
import ScrollSectionWithImage from "./components/ScrollSectionWithImage";
import GuaranteeSection from "./components/GuaranteeSection";
import { notFound } from "next/navigation";
import FreeChangeOrderService from "./components/FreeChangeOrderService";


export const dynamicParams = false;
export const dynamic = 'force-static';

const Spacer = () => (
  <div className="spacer-lg h-[30px] md:h-[100px]" id="read-more" />
);

const StandardService = ({ serviceDetails }) =>
{
  const { title, imageUrl, heading, description, sections } = serviceDetails;
  const { rightImageSection, leftImageSection, guaranteeSection } = sections;

  return (
    <div className="service-page">
      <HeroImage title={title} imgSrc={imageUrl} />
      <Spacer />
      <SectionWrapper
        heading={heading}
        description={description}
        imageUrl={rightImageSection.imageUrl}
        contentItems={rightImageSection.content}
      />
      <Spacer />
      <VideoSection service={true} height="690px" />
      <Spacer />
      <ScrollSectionWithImage
        imageUrl={leftImageSection.imageUrl}
        contentItems={leftImageSection.content}
        ctaText={leftImageSection.ctaText}
      />
      <Spacer />
      <GuaranteeSection
        guaranteeContent={guaranteeSection.content[0].details}
        imageUrl={guaranteeSection.imageUrl}
      />
      <BottomBanner />
    </div>
  );
};

export async function generateStaticParams()
{
  return [
    ...Object.keys(servicesData).map((service) => ({ service })),
    { service: "free-change-order-service" }
  ];
}

export async function generateMetadata({ params })
{
  const { service } = await params;
  const canonicalPath = `/${service}`;
  const absoluteUrl = `https://www.securecash.com.au${canonicalPath}`;

  if (service === "free-change-order-service") {
    return {
      title: "Free Change Order Service | SecureCash",
      description: "In many cases, SecureCash can provide a free change order service in conjunction with your cash collection request. Get in touch with us to discuss how!",
      alternates: {
        canonical: 'https://www.securecash.com.au/free-change-order-service',
      },
      openGraph: {
        title: "Free Change Order Service | SecureCash",
        description: "In many cases, SecureCash can provide a free change order service in conjunction with your cash collection request. Get in touch with us to discuss how!",
        url: 'https://www.securecash.com.au/free-change-order-service',
      },
      twitter: {
        card: 'summary',
        title: "Free Change Order Service | SecureCash",
        description: "In many cases, SecureCash can provide a free change order service in conjunction with your cash collection request. Get in touch with us to discuss how!",
      },
      robots: "index, follow",
    };
  }

  const serviceDetails = servicesData[service];
  if (!serviceDetails) {
    return {
      title: "Service Not Found | SecureCash",
      description: "The requested service could not be found."
    };
  }

  const metaTitle = serviceDetails.metaTitle || serviceDetails.title;
  const metaDescription = serviceDetails.description.replace(/<[^>]*>?/gm, '');
  const imageUrl = serviceDetails.imageUrl.startsWith('http')
    ? serviceDetails.imageUrl
    : `https://www.securecash.com.au${serviceDetails.imageUrl}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.securecash.com.au"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": metaTitle,
          "item": absoluteUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": metaTitle,
      "description": metaDescription,
      "provider": {
        "@type": "Organization",
        "name": "SecureCash",
        "url": "https://www.securecash.com.au"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Australia"
      },
      "url": absoluteUrl,
      "image": imageUrl,
    }
  ];

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: absoluteUrl,
    },
    robots: "index, follow",
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: absoluteUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
    },
    metadata: {
      'application/ld+json': structuredData.map(schema => JSON.stringify(schema)),
    },
  };
}

export default async function ServicePage({ params })
{
  const { service } = await params;

  if (service === "free-change-order-service") {
    return <FreeChangeOrderService />;
  }

  const serviceDetails = servicesData[service];
  if (!serviceDetails) {
    notFound();
  }

  return <StandardService serviceDetails={serviceDetails} />;
}