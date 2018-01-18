import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Pagination = ({ total, saucePerPage, page }) => {
  const totalPages = Math.floor(total / saucePerPage)
  return (
    <div className="pagination">
      <div className="pagination__prev">{page != 1 ? <Link to={`/sauces/page/${page - 1}`} >Prev</Link> : ""}</div>
      <div className="pagination__text">{`Page ${page} of ${totalPages}`}</div>
      {page != totalPages && <div className="pagination__next"><Link to={`/sauces/page/${page + 1}`} >Next</Link></div>}
    </div>
  )
}

export default Pagination;