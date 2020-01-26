import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Tour = props => {
  const {
    data: {
      wpgraphql: { tour },
    },
  } = props
  const { title, content } = tour

  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
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
      }
    }
  }
`
