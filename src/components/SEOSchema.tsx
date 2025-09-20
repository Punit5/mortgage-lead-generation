import React from 'react';

interface SchemaProps {
  type: 'organization' | 'service' | 'website' | 'breadcrumbs' | 'faq' | 'review';
  data?: any;
}

export default function SEOSchema({ type, data = {} }: SchemaProps) {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "MortgagePro BC",
          "alternateName": "MortgagePro",
          "description": "Leading mortgage broker in British Columbia providing competitive home loan rates and expert mortgage advice for Canadian homebuyers.",
          "url": "https://mortgagepro.ca",
          "logo": "https://mortgagepro.ca/logo.png",
          "image": "https://mortgagepro.ca/office.jpg",
          "telephone": "+1-604-555-MORT",
          "email": "info@mortgagepro.ca",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Main Street, Suite 456",
            "addressLocality": "Vancouver",
            "addressRegion": "BC",
            "postalCode": "V6B 1A1",
            "addressCountry": "CA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "49.2827",
            "longitude": "-123.1207"
          },
          "serviceArea": {
            "@type": "State",
            "name": "British Columbia"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Mortgage Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "First-Time Home Buyer Mortgages",
                  "description": "Specialized mortgage solutions for first-time homebuyers in BC"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Mortgage Refinancing",
                  "description": "Refinance your existing mortgage for better rates or cash-out options"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Investment Property Mortgages",
                  "description": "Financing solutions for investment properties and rental homes"
                }
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "847",
            "bestRating": "5",
            "worstRating": "1"
          },
          "priceRange": "$$",
          "openingHours": [
            "Mo-Fr 08:00-18:00",
            "Sa 09:00-17:00"
          ],
          "sameAs": [
            "https://www.facebook.com/mortgageprobc",
            "https://www.linkedin.com/company/mortgageprobc",
            "https://twitter.com/mortgageprobc"
          ],
          "memberOf": {
            "@type": "Organization",
            "name": "Mortgage Professionals Canada"
          }
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name || "Mortgage Pre-Approval Service",
          "description": data.description || "Fast and reliable mortgage pre-approval service for BC homebuyers with competitive rates and expert guidance.",
          "provider": {
            "@type": "FinancialService",
            "name": "MortgagePro BC"
          },
          "serviceType": "Mortgage Lending",
          "areaServed": {
            "@type": "State",
            "name": "British Columbia"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Mortgage Rates",
            "itemListElement": [
              {
                "@type": "Offer",
                "name": "5-Year Fixed Rate",
                "price": "5.89",
                "priceCurrency": "CAD",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "5.89",
                  "priceCurrency": "CAD",
                  "unitText": "PERCENT"
                }
              },
              {
                "@type": "Offer",
                "name": "3-Year Fixed Rate",
                "price": "6.14",
                "priceCurrency": "CAD",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "6.14",
                  "priceCurrency": "CAD",
                  "unitText": "PERCENT"
                }
              }
            ]
          },
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "price": "0",
            "priceCurrency": "CAD",
            "description": "Free mortgage consultation and pre-approval"
          }
        };

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MortgagePro BC - Best Mortgage Rates in British Columbia",
          "alternateName": "MortgagePro",
          "url": "https://mortgagepro.ca",
          "description": "Find the best mortgage rates in BC with MortgagePro. Get pre-approved in minutes with our expert mortgage brokers.",
          "publisher": {
            "@type": "FinancialService",
            "name": "MortgagePro BC"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://mortgagepro.ca/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "mainEntity": {
            "@type": "FinancialService",
            "name": "MortgagePro BC"
          }
        };

      case 'breadcrumbs':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.breadcrumbs?.map((crumb: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.url
          })) || []
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the minimum down payment required in BC?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "In British Columbia, the minimum down payment is 5% for homes up to $500,000, a combination of 5% on the first $500K and 10% on the remaining amount for homes between $500K-$1M, and 20% for homes over $1M."
              }
            },
            {
              "@type": "Question",
              "name": "How long does mortgage approval take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Pre-approval typically takes 1-3 business days, while full mortgage approval can take 7-14 business days depending on documentation and property appraisal."
              }
            },
            {
              "@type": "Question",
              "name": "What credit score do I need for a mortgage in Canada?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most lenders require a minimum credit score of 600-650 for mortgage approval. Higher scores (above 700) typically qualify for better interest rates."
              }
            },
            {
              "@type": "Question",
              "name": "Can I get a mortgage as a self-employed person?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, self-employed individuals can qualify for mortgages. You'll typically need 2 years of tax returns, business financial statements, and possibly a larger down payment."
              }
            },
            {
              "@type": "Question",
              "name": "What is mortgage stress testing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The mortgage stress test requires borrowers to qualify at either the contract rate plus 2% or 5.25%, whichever is higher. This ensures you can afford payments if rates increase."
              }
            }
          ]
        };

      case 'review':
        return {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "MortgagePro BC"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": data.rating || 5,
            "bestRating": 5,
            "worstRating": 1
          },
          "name": data.title || "Excellent mortgage service",
          "author": {
            "@type": "Person",
            "name": data.author || "Verified Customer"
          },
          "reviewBody": data.text || "Outstanding service and competitive rates. Made the home buying process smooth and stress-free.",
          "publisher": {
            "@type": "Organization",
            "name": "MortgagePro BC"
          }
        };

      default:
        return null;
    }
  };

  const schema = getSchema();
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  );
}

// SEO Meta Tags Component
interface SEOMetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function SEOMeta({
  title = "Best Mortgage Rates in BC | MortgagePro - Get Pre-Approved Today",
  description = "Find the lowest mortgage rates in British Columbia with MortgagePro. Expert mortgage brokers, fast pre-approval, and personalized service for BC homebuyers.",
  keywords = "mortgage rates BC, British Columbia mortgage broker, home loans Vancouver, mortgage pre-approval, first time home buyer BC, refinancing BC",
  canonical,
  ogImage = "/og-image.jpg",
  noIndex = false
}: SEOMetaProps) {
  React.useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      document.head.appendChild(meta);
    }

    // Update canonical URL
    if (canonical) {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonical);
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonical;
        document.head.appendChild(link);
      }
    }

    // Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      const existingTag = document.querySelector(`meta[property="${property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    updateOGTag('og:title', title);
    updateOGTag('og:description', description);
    updateOGTag('og:type', 'website');
    updateOGTag('og:url', window.location.href);
    updateOGTag('og:image', ogImage);
    updateOGTag('og:site_name', 'MortgagePro BC');

    // Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      const existingTag = document.querySelector(`meta[name="${name}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', description);
    updateTwitterTag('twitter:image', ogImage);

    // Robots meta tag
    if (noIndex) {
      updateTwitterTag('robots', 'noindex, nofollow');
    } else {
      updateTwitterTag('robots', 'index, follow');
    }

  }, [title, description, keywords, canonical, ogImage, noIndex]);

  return null; // This component only updates head tags
}

// Combined SEO Component
interface SEOProps extends SEOMetaProps {
  schemas?: Array<{ type: SchemaProps['type']; data?: any }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function SEO({ schemas = [], breadcrumbs, ...metaProps }: SEOProps) {
  return (
    <>
      <SEOMeta {...metaProps} />

      {/* Default schemas */}
      <SEOSchema type="organization" />
      <SEOSchema type="website" />
      <SEOSchema type="faq" />

      {/* Breadcrumbs schema */}
      {breadcrumbs && (
        <SEOSchema type="breadcrumbs" data={{ breadcrumbs }} />
      )}

      {/* Custom schemas */}
      {schemas.map((schema, index) => (
        <SEOSchema key={index} type={schema.type} data={schema.data} />
      ))}
    </>
  );
}