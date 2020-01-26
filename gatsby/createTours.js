const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
  // Setup our query
  const GET_TOURS = `
    query GET_TOURS($first:Int $after:String) {
      wpgraphql {
        tours(
          first: $first
          after: $after
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            uri
            tourId
            title
          }
        }
      }
    }
  `
  const { createPage } = actions
  const allTours = []
  const blogPages = []
  let pageNumber = 0

  // Create a function for getting tours
  const fetchTours = async variables =>
    await graphql(GET_TOURS, variables).then(({ data }) => {
      const {
        wpgraphql: {
          tours: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      const nodeIds = nodes.map(node => node.tourId)
      const toursTemplate = path.resolve(`./src/templates/tours.js`)
      const toursPath = !variables.after ? `/tours/` : `/tours/page/${pageNumber}`

      blogPages[pageNumber] = {
        path: toursPath,
        component: toursTemplate,
        context: {
          ids: nodeIds,
          pageNumber: pageNumber,
          hasNextPage: hasNextPage,
        },
        ids: nodeIds,
      }

      nodes.map(tour => {
        allTours.push(tour)
      })
      if (hasNextPage) {
        pageNumber++
        return fetchTours({ first: 12, after: endCursor })
      }
      return allTours
    })

  // Map over all the pages and call createPage
  await fetchTours({ first: 12, after: null }).then(allTours => {
    const tourTemplate = path.resolve(`./src/templates/tour.js`)

    blogPages.map(page => {
      console.log(`create tour archive: ${page.path}`)
      createPage(page)
    })

    allTours.map(tour => {
      console.log(`create tour: ${tour.uri}`)
      createPage({
        path: `/${tour.uri}`,
        component: tourTemplate,
        context: tour,
      })
    })
  })
}
