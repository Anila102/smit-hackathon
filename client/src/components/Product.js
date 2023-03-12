import React from 'react'

export default function (props) {
  return (
    <>
        <div className="card mx-4 my-3 col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center" >
  <img className="card-img-top" src="..." alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title fw-bold"  style={{color:"blue"}}>{props.title}</h5>
    <p className="card-text">Description: {props.description}</p>
    <p className="card-text">Price: Rs-{props.price}</p>
    <p className="card-text">Category: {props.category}</p>

    <button className="btn btn-success">Order</button>
  </div>
</div>
    </>
  )
}
