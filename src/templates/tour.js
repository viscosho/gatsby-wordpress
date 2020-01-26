import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Tour = props => {
  const {
    data: {
      wpgraphql: { tour },
    },
  } = props
  const { title, content, featuredImage } = tour

  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      { featuredImage && <img
        src={featuredImage.link}
        alt={title}
      />}
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Layout>
  )
}

export default Tour

export const pageQuery = graphql`

  query GET_TOUR($id: ID!) {
    wpgraphql {
      tour(id: $id) {
        title
        content
        uri
        tourId
        featuredImage {
          link
        }
      }
    }
  }
`
