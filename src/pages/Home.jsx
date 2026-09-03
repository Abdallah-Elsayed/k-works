import { Link } from "react-router-dom"
function Home() {
  return (
    <div className="home">
      {/* 1. Introduction + founder */}
      <section className="home-intro">
        <div className="home-intro-text">
          <p className="home-eyebrow">Welcome</p>
          <h1>Crafted with care, built to last</h1>
          <p>
            We are a small studio focused on thoughtful design and careful
            making. Every project starts with a conversation and ends with
            work we are proud to put our name on.
          </p>
        </div>

        <figure className="home-founder">
          <img
            src={`${import.meta.env.BASE_URL}${"/images/founder.jpg".replace(/^\//, '')}`}
            alt="Portrait of the founder"
          />
          <figcaption>The founder in the studio</figcaption>
        </figure>
      </section>

      {/* 2. Mill + workshop */}
      <section className="home-places">
        <h2>Where the work happens</h2>
        <div className="home-places-grid">
          <figure>
            <img
              src={`${import.meta.env.BASE_URL}${"/images/workshop.jpg".replace(/^\//, '')}`}
              alt="The Workshop"
            />
            <figcaption>The Workshop</figcaption>
          </figure>
          <figure>
            <img
              src={`${import.meta.env.BASE_URL}${"/images/work-carve.jpg".replace(/^\//, '')}`}
              alt="The workshop"
            />
            <figcaption>The works</figcaption>
          </figure>
        </div>
      </section>

      {/* 3. How we work + why */}
      <section className="home-process">
        <div>
          <h2>How we work</h2>
          <ol>
            <li>We listen and gather your needs.</li>
            <li>We shape a clear direction together.</li>
            <li>We make, refine, and finish with care.</li>
          </ol>
        </div>
        <div>
          <h2>Why it matters</h2>
          <p>
            Good work is not rushed. By slowing down at the start, we avoid
            waste later and leave you with something that fits your life and
            lasts.
          </p>
        </div>
      </section>

      {/* 4. Button to Studio */}
      <section className="home-cta">
        <h2>Ready to shape something of your own?</h2>
        <p>Tell us what you need. We will help you customize the work.</p>
        <Link to="/studio" className="home-button">
          Customize the work
        </Link>
      </section>
    </div>
  )
}

export default Home