import { useEffect, useState } from "react"
import { supabase } from '/src/superbaseClient.js'
import './Works.css'


function Works() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    async function loadWorks() {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('works')
        .select('id, title, image_url, summary, details')
        .order('id', { ascending: true })

      if (error) {
        setError(error.message)
        setWorks([])
      } else {
        setWorks(data ?? [])
      }

      setLoading(false)
    }

    loadWorks()
  }, [])

  function handleCardClick(id) {
    setOpenId((current) => (current === id ? null : id))
  }

  if (loading) {
    return (
      <div className="works">
        <p>Loading works…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="works">
        <p>Could not load works: {error}</p>
      </div>
    )
  
  }
  return (
    <div className="works">
      <header className="works-header">
        <h1>Works</h1>
        <p>Selected pieces from the mill and workshop.</p>
      </header>

      {works.length === 0 ? (
        <p>No works yet.</p>
      ) : (
        <div className="works-grid">
          {works.map((item) => {
            const isOpen = openId === item.id

            return (
              <article
                key={item.id}
                className={`works-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="works-card-trigger"
                  onClick={() => handleCardClick(item.id)}
                  aria-expanded={isOpen}
                >
                  <img src={item.image_url} alt={item.title} />
                  <span className="works-card-title">{item.title}</span>
                  <span className="works-card-hint">
                    {isOpen ? 'Close' : 'View details'}
                  </span>
                </button>

                {isOpen && (
                  <div className="works-card-details">
                    <p className="works-card-summary">{item.summary}</p>
                    <p>{item.details}</p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Works