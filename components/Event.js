import Map from './Map'

export default ({ title, date, html, location }) => {
  return (
    <div>
      <style jsx>{`
        .date {
          font-size: 1.5rem;
        }
        .description {
        }
        .description :global(img) {
          max-width: 100%;
        }
        .description :global(h1) {
          margin: 5px 0;
        }
      `}</style>
      <div className="date">{date && date.toLocaleString('da-DK')}</div>
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      {location ? <Map location={location} /> : ''}
    </div>
  )
}
