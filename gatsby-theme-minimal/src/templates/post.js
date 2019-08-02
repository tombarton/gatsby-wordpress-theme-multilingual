import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

function createMarkup(markup) {
    return { __html: markup };
}

const PostTemplate = ({ data }) => {
    const post = data.wordpressPost;
    return (
        <>
            <h1>{post.title}</h1>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={createMarkup(post.content)} />
        </>
    );
};

PostTemplate.propTypes = {
    data: PropTypes.shape({
        // TODO: Shape this properly...
        wordpressPost: PropTypes.object,
    }).isRequired,
};

export const pageQuery = graphql`
    query($id: String!) {
        wordpressPost(id: { eq: $id }) {
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

export default PostTemplate;
