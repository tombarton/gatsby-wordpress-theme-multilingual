import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

function createMarkup(markup) {
    return { __html: markup };
}

const PageTemplate = ({ data }) => {
    const page = data.wordpressPage;
    return (
        <>
            <h1>{page.title}</h1>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={createMarkup(page.content)} />
        </>
    );
};
PageTemplate.propTypes = {
    data: PropTypes.shape({
        // TODO: Shape this properly...
        wordpressPage: PropTypes.object,
    }).isRequired,
};
export const pageQuery = graphql`
    query($id: String!) {
        wordpressPage(id: { eq: $id }) {
            title
            content
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`;
export default PageTemplate;
