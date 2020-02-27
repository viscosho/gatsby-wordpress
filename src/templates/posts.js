import React from "react"
import { graphql, Link } from "gatsby"
import Pagination from "../components/pagination"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Posts = props => {
  const {
    data: {
      wpgraphql: { posts },
    },
    pageContext: { pageNumber, hasNextPage },
  } = props

  const currentPage = pageNumber ? `- Page ${pageNumber}` : ``
  return (
    <Layout>
      <SEO title={`Blog Archive`} />
      <h1 className="text-3xl mb-8">Blog Archive {currentPage}</h1>
      <div className="grid grid-cols-3 gap-4">
        {posts.nodes.map(post => (
          <div>
            <img src={post.featuredImage.link} alt={post.title} />
            <h2 className="text-2xl mb-6" key={post.id}>
              <Link to={post.slug}>{post.title}</Link>
            </h2>
          </div>
        ))}
      </div>
      <Pagination pageNumber={pageNumber} hasNextPage={hasNextPage} />
    </Layout>
  )
}

export default Posts

export const pageQuery = graphql`
  query GET_POSTS($ids: [ID]) {
    wpgraphql {
      posts(where: { in: $ids }) {
        nodes {
          id
          title
          featuredImage {
            sourceUrl
            altText
            title
            link
          }
          slug
        }
      }
    }
  }
`
