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
      <h1 className="text-3xl">Tours Archive {currentPage}</h1>
      <div className="grid grid-cols-3 gap-4">
      {tours.nodes.map(tour => (
          <div>
            <Link to={`/tour/${tour.slug}`}>
              {tour.featuredImage && <img src={tour.featuredImage.link} alt={tour.title} /> }
              <h2 className="text-2xl mb-6" key={tour.id}>
                {tour.title}
              </h2>
            </Link>
          </div>
      ))}
      </div>
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
          featuredImage {
            sourceUrl
            altText
            link
          }
          slug
        }
      }
    }
  }
`
