import "./Logo.css";

const LogoPage = () => {
  return (
    <div className="logo-page">
      <div className="logo-container">
        <div className="logo-content">
          <div className="main-logo">
            <h1>STYLE-SHEET</h1>
            <p className="tagline">Your Style, Your Way
            </p>
          </div>

          <div className="logo-variations">
            <div className="logo-variant">
              <div className="logo-icon">SS</div>
              <span>Monogram</span>
            </div>

            <div className="logo-variant">
              <div className="logo-text-only">STYLE-SHEET</div>
              <span>Text Only</span>
            </div>

            <div className="logo-variant">
              <div className="logo-minimal">S</div>
              <span>Minimal</span>
            </div>
          </div>

          <div className="brand-colors">
            <h3>Brand Colors</h3>
            <div className="color-palette">
              <div className="color-swatch primary" title="Primary Blue"></div>
              <div className="color-swatch secondary" title="Secondary Gray"></div>
              <div className="color-swatch accent" title="Accent Color"></div>
              <div className="color-swatch dark" title="Dark Text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoPage
