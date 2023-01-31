import React from 'react';

const Paginator = () => {
  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-end mb-1">
        <nav aria-label="...">
          <ul className="pagination pagination-sm">
            <li className="page-item disabled">
              <a className="page-link" href="" tabIndex={-1}>
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="">
                2
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="">
                3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Paginator;
