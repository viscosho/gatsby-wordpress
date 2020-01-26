import React from "react"
import { graphql, Link } from "gatsby"
import Pagination from "../components/pagination"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Tours = props => {
  const {
    data: {
      wpgraphql: { tours },
    },
    pageContext: { pageNumber, hasNextPage },
  } = props

  const currentPage = pageNumber ? `- Page ${pageNumber}` : ``
  return (
    <Layout>
      <SEO title={`Blog Archive`} />
      <h1>Tours Archive {currentPage}</h1>
      {tours.nodes.map(tour => (
        <h2 key={tour.id}>
          <Link to={`/tour/${tour.slug}`}>{tour.title}</Link>
        </h2>
      ))}
      <Pagination pageNumber={pageNumber} hasNextPage={hasNextPage} />
    </Layout>
  )
}

export default Tours

export const pageQuery = graphql`
  query GET_TOURS($ids: [ID]) {
    wpgraphql {
      tours(where: { in: $ids }) {
        nodes {
          id
          title
          slug
        }
      }
    }
  }
`
