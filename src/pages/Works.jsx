import { useMemo, useState } from 'react'
import works from '../data/works.json'
import './Works.css'

export default function Works() {
  const items = useMemo(() => works ?? [], [])
  const [openId, setOpenId] = useState(null)

  function toggle(id) {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <main className="works-page">
      <header className="works-intro">
        <p className="works-kicker">Portfolio</p>
        <h1>Works</h1>
        <p className="works-lead">
          Finished pieces from the workshop. Click a card to read more.
        </p>
      </header>

      <section className="works-grid" aria-label="Works">
        {items.map((work) => {
          const open = openId === work.id

          return (
            <article
              key={work.id}
              className={`work-card${open ? ' is-open' : ''}`}
            >
              <button
                type="button"
                className="work-card-hit"
                onClick={() => toggle(work.id)}
                aria-expanded={open}
              >
                <div className="work-image-wrap">
                  <img
                    src= {process.env.PUBLIC_URL + work.image}
                    alt={work.title}
                    loading="lazy"
                  />
                </div>
                <div className="work-card-body">
                  <h2>{work.title}</h2>
                  <p className="work-meta">
                    {[work.material, work.year].filter(Boolean).join(' · ')}
                  </p>
                  <p className="work-summary">{work.summary}</p>
                </div>
              </button>

              {open && (
                <div className="work-expand">
                  {work.image && (
                    <img
                      className="work-expand-image"
                      src={process.env.PUBLIC_URL + work.image}
                      alt=""
                    />
                  )}
                  {work.size && <p className="work-size">{work.size}</p>}
                  <p className="work-description">{work.description}</p>
                </div>
              )}
            </article>
          )
        })}
      </section>
    </main>
  )
}