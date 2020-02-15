import React from 'react'

export default ({ children }) => (
  <>
    <style jsx>
      {`
        .table {
          width: 100%;
          margin-bottom: 1rem;
          border-collapse: collapse;
        }
        .table td,
        .table th {
          padding: 0.75rem;
          vertical-align: top;
          border-top: 1px solid #dee2e6;
        }
        th {
          text-align: inherit;
        }
        .table thead th {
          vertical-align: bottom;
          border-bottom: 2px solid #dee2e6;
        }

        .table tbody + tbody {
          border-top: 2px solid #dee2e6;
        }
      `}
    </style>
    <table className="table">{children}</table>
  </>
)
