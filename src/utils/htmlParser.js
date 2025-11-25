// src/utils/htmlParser.js
import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image'; // 🚀 ADDED

const options = {
    replace: (node) =>
    {
        // 1. Handle Links (Existing logic)
        if (node.type === "tag" && node.name === "a") {
            const { href, class: className, target, rel, ...rest } = node.attribs;
            const children = domToReact(node.children, options);

            if (!href || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http") || href.startsWith("#")) {
                return <a href={href} className={className} target={target || "_blank"} rel={rel || "noopener noreferrer"} {...rest}>{children}</a>;
            }
            return <Link href={href} className={className} target={target} rel={rel} {...rest}>{children}</Link>;
        }

        // 2. 🚀 NEW: Handle Images inside HTML content
        if (node.type === "tag" && node.name === "img") {
            const { src, alt, width, height, class: className, ...rest } = node.attribs;

            // Return Next/Image
            // We use a wrapper div to handle alignment/spacing if needed, or just the image
            return (
                <div className="relative w-full h-auto my-8">
                    <Image
                        src={src}
                        alt={alt || "Blog image"}
                        width={parseInt(width) || 900} // Fallback width
                        height={parseInt(height) || 600} // Fallback height
                        className={`h-auto w-full object-cover ${className || ''}`}
                        sizes="(max-width: 768px) 100vw, 900px"
                    />
                </div>
            );
        }
    }
};

export const parseHtml = (content) =>
{
    if (!content) return null;
    return parse(content, options);
};