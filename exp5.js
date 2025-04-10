const replaceLinks = (node) =>
{
    if (node.type === 'tag' && node.name === 'a') {
        const { href, class: className, target, rel, ...rest } = node.attribs;

        // For tel: links or external links, we can keep using the <a> tag
        if (href.startsWith('tel:') || href.startsWith('http') || href.startsWith('https')) {
            return (
                <a
                    href={href}
                    className={className}
                    target={target}
                    rel={rel}
                    {...rest}
                >
                    {node.children && node.children.map((child, i) =>
                    {
                        if (child.type === 'text') {
                            return child.data;
                        } else {
                            return parse(child.toString(), { replace: replaceLinks });
                        }
                    })}
                </a>
            );
        }

        // For internal links, use Next.js Link component
        return (
            <Link
                href={href}
                className={className}
                target={target}
                rel={rel}
                {...rest}
            >
                {node.children && node.children.map((child, i) =>
                {
                    if (child.type === 'text') {
                        return child.data;
                    } else {
                        return parse(child.toString(), { replace: replaceLinks });
                    }
                })}
            </Link>
        );
    }
};
{ parse(paragraph, { replace: replaceLinks }); }