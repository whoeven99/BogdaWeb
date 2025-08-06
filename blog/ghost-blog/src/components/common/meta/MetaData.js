import * as React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import url from "url";

import config from "../../../utils/siteConfig";
import ArticleMeta from "./ArticleMeta";
import WebsiteMeta from "./WebsiteMeta";
import AuthorMeta from "./AuthorMeta";

/**
 * MetaData will generate all relevant meta data information incl.
 * JSON-LD (schema.org), Open Graph (Facebook) and Twitter properties.
 *
 */
const MetaData = ({ 
    data = {}, 
    settings, 
    title, 
    description, 
    image, 
    location 
}) => {
    const canonical = url.resolve(config.siteUrl, location.pathname);
    const { ghostPost, ghostTag, ghostAuthor, ghostPage } = data;

    // 安全读取 settings 节点，防止 edges 为空报错
    const siteSettings = settings?.allGhostSettings?.edges?.[0]?.node;

    if (ghostPost) {
        return <ArticleMeta data={ghostPost} canonical={canonical} />;
    } else if (ghostTag) {
        return <WebsiteMeta data={ghostTag} canonical={canonical} type="Series" />;
    } else if (ghostAuthor) {
        return <AuthorMeta data={ghostAuthor} canonical={canonical} />;
    } else if (ghostPage) {
        return <WebsiteMeta data={ghostPage} canonical={canonical} type="WebSite" />;
    } else {
        // 如果 siteSettings 不存在，使用默认值避免报错
        const siteTitle = title || config.siteTitleMeta || siteSettings?.title || '';
        const siteDescription = description || config.siteDescriptionMeta || siteSettings?.description || '';
        let siteImage = image || siteSettings?.cover_image || null;
        siteImage = siteImage ? url.resolve(config.siteUrl, siteImage) : null;

        return (
            <WebsiteMeta
                data={{}}
                canonical={canonical}
                title={siteTitle}
                description={siteDescription}
                image={siteImage}
                type="WebSite"
            />
        );
    }
};



MetaData.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.object,
        ghostTag: PropTypes.object,
        ghostAuthor: PropTypes.object,
        ghostPage: PropTypes.object,
    }),
    settings: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
};

const MetaDataQuery = (props) => (
    <StaticQuery
        query={graphql`
            query GhostSettingsMetaData {
                allGhostSettings {
                    edges {
                        node {
                            title
                            description
                        }
                    }
                }
            }
        `}
        render={(data) => <MetaData settings={data} {...props} />}
    />
);

export default MetaDataQuery;
