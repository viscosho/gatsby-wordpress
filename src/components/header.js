import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import MainMenu from "./mainMenu"

const Header = ({ siteTitle }) => (
  <header
    id="header"
    className="text-gray-900 leading-normal mb-6"
    style={{
      background: `rebeccapurple`,
    }}
  >
    <div
      className="p-6 max-w-screen-lg mx-auto"
    >
      <div
        className="w-full max-w-screen-xl relative mx-auto px-6"
      >
        <h1
          className="text-4xl flex items-center -mx-6"
        >
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <MainMenu />
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
