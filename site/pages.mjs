const astroBinProfile = "https://www.astrobin.com/users/FlapAstro/";
const instagramProfile = "https://www.instagram.com/flapastro/";

function header(active = "") {
  const link = (path, label, id) =>
    `<a href="${path}"${active === id ? ' aria-current="page"' : ""}>${label}</a>`;

  return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="/" aria-label="FlapAstro home">
        <svg class="brand-mark" viewBox="0 0 44 44" aria-hidden="true">
          <circle cx="22" cy="22" r="20"></circle>
          <path d="M8 26c7-1 11-4 15-12 3 8 7 11 13 12-7 1-11 4-13 11-3-7-7-10-15-11Z"></path>
          <circle cx="32.5" cy="10.5" r="1.6"></circle>
        </svg>
        <span>FlapAstro</span>
      </a>
      <nav aria-label="Primary navigation">
        ${link("/gallery/", "Images", "gallery")}
        ${link("/about/", "About", "about")}
        ${link("/equipment/", "Equipment", "equipment")}
        ${link("/allsky/", "All-Sky", "allsky")}
        ${link("/software/", "Software", "software")}
      </nav>
      <div class="header-socials" aria-label="FlapAstro social profiles">
        <a href="${astroBinProfile}" target="_blank" rel="noreferrer">AstroBin <span aria-hidden="true">↗</span></a>
        <a href="${instagramProfile}" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
      </div>
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-nav">
        <span class="sr-only">Open navigation</span>
        <span></span><span></span>
      </button>
    </header>
    <div class="mobile-nav" id="mobile-nav" hidden>
      ${link("/gallery/", "Images", "gallery")}
      ${link("/about/", "About", "about")}
      ${link("/equipment/", "Equipment", "equipment")}
      ${link("/allsky/", "All-Sky Camera", "allsky")}
      ${link("/software/", "Software", "software")}
      <a href="${astroBinProfile}" target="_blank" rel="noreferrer">AstroBin ↗</a>
      <a href="${instagramProfile}" target="_blank" rel="noreferrer">Instagram · @FlapAstro ↗</a>
    </div>`;
}

function footer() {
  return `
    <footer>
      <div class="footer-brand">
        <span>FlapAstro</span>
        <p>Deep-sky images and astronomy software from Switzerland.</p>
      </div>
      <div class="footer-links">
        <a class="footer-social" href="${astroBinProfile}" target="_blank" rel="noreferrer" aria-label="FlapAstro on AstroBin (opens in a new tab)">
          <span class="footer-social-icon footer-social-icon--astrobin" aria-hidden="true"><span></span></span>
          <span><strong>AstroBin</strong><small>FlapAstro</small></span>
        </a>
        <a class="footer-social" href="${instagramProfile}" target="_blank" rel="noreferrer" aria-label="FlapAstro on Instagram (opens in a new tab)">
          <span class="footer-social-icon footer-social-icon--instagram" aria-hidden="true"></span>
          <span><strong>Instagram</strong><small>@FlapAstro</small></span>
        </a>
        <a class="footer-social" href="https://github.com/rakla123" target="_blank" rel="noreferrer" aria-label="FlapAstro projects on GitHub (opens in a new tab)">
          <span class="footer-social-icon footer-social-icon--github" aria-hidden="true"></span>
          <span><strong>GitHub</strong><small>rakla123</small></span>
        </a>
      </div>
      <p class="copyright">© <span id="year">2026</span> FlapAstro</p>
    </footer>`;
}

function layout({ title, description, active, body, inner = true }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#080b10">
    <meta name="description" content="${description}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="/og.png">
    <meta name="twitter:card" content="summary_large_image">
    <title>${title}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://cdn.astrobin.com">
    <link rel="stylesheet" href="/styles.css">
    <script src="/app.js" defer></script>
  </head>
  <body class="${inner ? "inner-page" : "home-page"}">
    ${header(active)}
    ${body}
    ${footer()}
  </body>
</html>`;
}

const home = layout({
  title: "FlapAstro — Deep-sky imaging",
  description: "FlapAstro — an astrophotography portfolio from Switzerland, plus astronomy software and equipment.",
  inner: false,
  body: `
    <main id="main">
      <section class="hero" aria-labelledby="hero-title">
        <img class="hero-image" src="https://cdn.astrobin.com/thumbs/I0Wdsk13MiZi_2560x0_9QJlzQeC.jpg?v=1781272881" alt="NGC 3718 and nearby galaxies in a wide star field" fetchpriority="high">
        <div class="hero-shade"></div>
        <div class="hero-copy">
          <p class="eyebrow">Astrophotography · Switzerland</p>
          <h1 id="hero-title">A closer look<br>at the deep sky.</h1>
          <p class="hero-intro">Images shaped by long nights, careful observation, and a lasting fascination with the universe.</p>
          <a class="text-link light" href="/gallery/">Explore the image catalogue <span aria-hidden="true">→</span></a>
        </div>
        <a class="image-caption" href="https://www.astrobin.com/dsiose/" target="_blank" rel="noreferrer">
          <span>NGC 3718</span>
          <span>Ursa Major · View on AstroBin ↗</span>
        </a>
        <span class="hero-copyright">© FlapAstro</span>
      </section>
      <section class="home-directory" aria-labelledby="explore-title">
        <div class="directory-heading">
          <p class="eyebrow">Explore FlapAstro</p>
          <h2 id="explore-title">Images, instruments,<br>and software.</h2>
        </div>
        <div class="directory-grid">
          <a href="/gallery/"><span>01</span><h3>Images</h3><p>Browse by catalogue and subject type.</p><b aria-hidden="true">→</b></a>
          <a href="/about/"><span>02</span><h3>About</h3><p>The story and approach behind FlapAstro.</p><b aria-hidden="true">→</b></a>
          <a href="/equipment/"><span>03</span><h3>Equipment</h3><p>The optical systems used to gather the light.</p><b aria-hidden="true">→</b></a>
          <a href="/allsky/"><span>04</span><h3>All-Sky Camera</h3><p>A future live view and archive of the sky above.</p><b aria-hidden="true">→</b></a>
          <a href="/software/"><span>05</span><h3>Software</h3><p>Tools created for the imaging workflow.</p><b aria-hidden="true">→</b></a>
        </div>
      </section>
    </main>`,
});

const gallery = layout({
  title: "Images — FlapAstro",
  description: "Browse the FlapAstro astrophotography catalogue by object catalogue and subject type.",
  active: "gallery",
  body: `
    <main id="main">
      <section class="page-intro">
        <p class="eyebrow">Image archive</p>
        <h1>The image<br>catalogue.</h1>
        <p>Browse by astronomical catalogue and subject type. Full-resolution images and acquisition details are available on AstroBin.</p>
      </section>
      <section class="work section section--page" aria-label="Image catalogue">
        <div class="catalogue-controls" aria-label="Image catalogue controls">
          <fieldset class="filter-group" data-filter-group="catalogue">
            <legend>Catalogue</legend>
            <div class="filter-options">
              <button type="button" class="filter-button is-active" data-filter="all" aria-pressed="true">All</button>
              <button type="button" class="filter-button" data-filter="messier" aria-pressed="false">Messier</button>
              <button type="button" class="filter-button" data-filter="ngc" aria-pressed="false">NGC</button>
              <button type="button" class="filter-button" data-filter="ic" aria-pressed="false">IC</button>
              <button type="button" class="filter-button" data-filter="sh2" aria-pressed="false">Sharpless · SH2</button>
              <button type="button" class="filter-button" data-filter="other" aria-pressed="false">Other</button>
            </div>
          </fieldset>
          <fieldset class="filter-group" data-filter-group="subject">
            <legend>Subject</legend>
            <div class="filter-options">
              <button type="button" class="filter-button is-active" data-filter="all" aria-pressed="true">All</button>
              <button type="button" class="filter-button" data-filter="deep-sky" aria-pressed="false">Deep sky</button>
              <button type="button" class="filter-button" data-filter="planetary" aria-pressed="false">Planetary</button>
              <button type="button" class="filter-button" data-filter="solar" aria-pressed="false">Solar</button>
              <button type="button" class="filter-button" data-filter="lunar" aria-pressed="false">Lunar</button>
            </div>
          </fieldset>
          <label class="sort-control"><span>Sort images</span><select id="catalogue-sort"><option value="catalogue">By catalogue</option><option value="name">By object name</option></select></label>
        </div>
        <p class="result-count" id="result-count" aria-live="polite">3 images</p>
        <div class="gallery" id="image-catalogue">
          <article class="gallery-card" data-catalogue="messier" data-subject="deep-sky" data-object-name="M81" data-catalogue-rank="1">
            <a href="https://www.astrobin.com/bb09f0/" target="_blank" rel="noreferrer" aria-label="View M81 on AstroBin">
              <div class="image-frame"><img src="https://cdn.astrobin.com/thumbs/y-FInx94drbr_2560x0_9QJlzQeC.jpg?v=1777877526" alt="M81, Bode's Galaxy, surrounded by faint integrated flux nebula" loading="lazy"></div>
              <div class="card-meta"><div><div class="image-tags"><span>Messier</span><span>Deep sky</span><span>Galaxy</span></div><h3>M81</h3><p>Bode’s Galaxy · RGB</p></div><span aria-hidden="true">↗</span></div>
            </a>
          </article>
          <article class="gallery-card" data-catalogue="ngc" data-subject="deep-sky" data-object-name="NGC 3718" data-catalogue-rank="2">
            <a href="https://www.astrobin.com/dsiose/" target="_blank" rel="noreferrer" aria-label="View NGC 3718 on AstroBin">
              <div class="image-frame"><img src="https://cdn.astrobin.com/thumbs/I0Wdsk13MiZi_2560x0_9QJlzQeC.jpg?v=1781272881" alt="NGC 3718 and nearby galaxies in a wide star field" loading="lazy"></div>
              <div class="card-meta"><div><div class="image-tags"><span>NGC</span><span>Deep sky</span><span>Galaxy</span></div><h3>NGC 3718</h3><p>Peculiar galaxy · RGB</p></div><span aria-hidden="true">↗</span></div>
            </a>
          </article>
          <article class="gallery-card" data-catalogue="ic" data-subject="deep-sky" data-object-name="IC 434" data-catalogue-rank="3">
            <a href="https://www.astrobin.com/dgjxih/" target="_blank" rel="noreferrer" aria-label="View IC 434 on AstroBin">
              <div class="image-frame"><img src="https://cdn.astrobin.com/thumbs/aqPlAtfFbZJW_2560x0_9QJlzQeC.jpg?v=1781272873" alt="The Horsehead Nebula and surrounding hydrogen emission in HOO color" loading="lazy"></div>
              <div class="card-meta"><div><div class="image-tags"><span>IC</span><span>Deep sky</span><span>Nebula</span></div><h3>IC 434</h3><p>Horsehead Nebula · HOO</p></div><span aria-hidden="true">↗</span></div>
            </a>
          </article>
        </div>
        <div class="empty-catalogue" id="empty-catalogue" hidden><p>No images match these filters yet.</p><button type="button" id="reset-filters">Show all images</button></div>
        <div class="work-footer"><a class="button" href="${astroBinProfile}" target="_blank" rel="noreferrer">View the complete AstroBin portfolio <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>`,
});

const about = layout({
  title: "About — FlapAstro",
  description: "The story and approach behind the FlapAstro astrophotography portfolio.",
  active: "about",
  body: `
    <main id="main">
      <section class="page-intro">
        <p class="eyebrow">About FlapAstro</p>
        <h1>Curiosity,<br>measured in light-years.</h1>
      </section>
      <section class="about about--page section">
        <div class="about-grid">
          <div><p class="eyebrow">The story</p><h2>From film<br>to photons.</h2></div>
          <div class="about-copy">
            <p class="lead">FlapAstro is an astrophotography portfolio based in Switzerland.</p>
            <p>An interest in astronomy that began around 1980 has evolved alongside the tools used to capture the night sky—from film and manually guided exposures to today’s digital imaging systems.</p>
            <p>The process combines patient acquisition, careful processing, and software experimentation. Every image offers another reason to keep learning.</p>
            <p>This site brings selected images, the equipment behind them, and personal astronomy software together in one place.</p>
          </div>
        </div>
      </section>
    </main>`,
});

const equipment = layout({
  title: "Equipment — FlapAstro",
  description: "The telescopes, cameras, mount, and focusing equipment used for FlapAstro images.",
  active: "equipment",
  body: `
    <main id="main">
      <section class="page-intro">
        <p class="eyebrow">Equipment</p>
        <h1>The tools behind<br>the images.</h1>
        <p>Two complementary imaging systems cover detailed deep-sky work and wider fields. Exact acquisition equipment remains recorded with each image on AstroBin.</p>
      </section>
      <section class="equipment section section--page">
        <div class="equipment-systems">
          <article class="equipment-system">
            <div class="system-number">01</div>
            <div class="system-content"><p class="system-label">Deep-sky system</p><h3>Equinox 120</h3><p class="system-summary">A monochrome refractor system for detailed imaging of galaxies, nebulae, and smaller deep-sky structures.</p><dl class="equipment-list"><div><dt>Optics</dt><dd>Sky-Watcher Equinox 120 · 0.85× reducer</dd></div><div><dt>Focusing</dt><dd>FTF focuser</dd></div><div><dt>Camera</dt><dd>QHYCCD QHY268M</dd></div><div><dt>Guiding</dt><dd>QHY OAG</dd></div><div><dt>Filter wheel</dt><dd>QHY filter wheel</dd></div><div><dt>Filters</dt><dd>Antlia LRGB · Ha · OIII · SII</dd></div><div><dt>Mount</dt><dd>Sky-Watcher AZ-EQ6 GT</dd></div></dl></div>
          </article>
          <article class="equipment-system">
            <div class="system-number">02</div>
            <div class="system-content"><p class="system-label">Wide-field system</p><h3>RedCat 51 II</h3><p class="system-summary">A compact, fast color system for expansive nebulae, molecular clouds, and wide-field compositions.</p><dl class="equipment-list"><div><dt>Optics</dt><dd>William Optics RedCat 51 II</dd></div><div><dt>Focusing</dt><dd>DeepSkyDad AF</dd></div><div><dt>Camera</dt><dd>QHYCCD QHY268C</dd></div><div><dt>Mount</dt><dd>Sky-Watcher AZ-EQ6 GT</dd></div></dl></div>
          </article>
        </div>
        <div class="equipment-note"><p>Equipment changes as the imaging workflow evolves. Refer to the individual image pages for the precise telescope, camera, filters, and exposure details used for each result.</p><a class="text-link" href="${astroBinProfile}" target="_blank" rel="noreferrer">View equipment details on AstroBin <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>`,
});

const allsky = layout({
  title: "All-Sky Camera — FlapAstro",
  description: "How the FlapAstro all-sky camera was built, including its Intel NUC, Windows software, sensors, Arduino controller, and dew-point heater.",
  active: "allsky",
  body: `
    <main id="main">
      <section class="page-intro">
        <p class="eyebrow">All-Sky Camera</p>
        <h1>Built to watch<br>the whole sky.</h1>
        <p>A purpose-built camera system for continuous horizon-to-horizon imaging, with its own Windows computer and automatic dew-prevention controller.</p>
      </section>
      <section class="allsky section section--page" aria-labelledby="allsky-overview">
        <div class="allsky-stage">
          <div class="allsky-dome" aria-hidden="true">
            <span class="allsky-star allsky-star--one"></span>
            <span class="allsky-star allsky-star--two"></span>
            <span class="allsky-star allsky-star--three"></span>
            <span class="allsky-star allsky-star--four"></span>
            <span class="allsky-horizon"></span>
          </div>
          <div class="allsky-build-intro">
            <p class="system-label">Purpose-built system</p>
            <h2 id="allsky-overview">Camera, computer,<br>and climate control.</h2>
            <p>The camera records the complete sky while a dedicated Intel NUC runs Windows and the all-sky capture software. A separate environmental-control system protects the optics from dew.</p>
          </div>
        </div>

        <div class="allsky-parts" aria-label="All-sky camera components">
          <article><span>01</span><p>Imaging</p><h3>ZWO ASI224MC</h3><p>Wide-angle all-sky camera capturing the visible hemisphere above the observatory.</p></article>
          <article><span>02</span><p>Computer</p><h3>Intel NUC</h3><p>A compact dedicated computer running Windows continuously at the camera.</p></article>
          <article><span>03</span><p>Capture</p><h3>AllSky software</h3><p>Controls image acquisition and manages the continuous all-sky imaging workflow.</p></article>
          <article><span>04</span><p>Environment</p><h3>Sensor + Arduino</h3><p>Temperature and humidity sensing, dew-point calculation, and variable-power heater control.</p></article>
        </div>

        <section class="dew-system" aria-labelledby="dew-title">
          <div class="dew-heading">
            <div><p class="eyebrow">Automatic dew prevention</p><h2 id="dew-title">Heat only<br>when needed.</h2></div>
            <p>Rather than running at fixed power, the heater responds to changing atmospheric conditions. This reduces unnecessary heating while maintaining protection as the air approaches saturation.</p>
          </div>
          <ol class="dew-flow">
            <li><span>01</span><h3>Sense</h3><p>A sensor measures ambient temperature and relative humidity.</p></li>
            <li><span>02</span><h3>Calculate</h3><p>The control system calculates the current dew point from those readings.</p></li>
            <li><span>03</span><h3>Assess</h3><p>The calculated dew risk is translated into the required heating level.</p></li>
            <li><span>04</span><h3>Control</h3><p>An Arduino varies the heater’s power output instead of simply switching it fully on or off.</p></li>
            <li><span>05</span><h3>Protect</h3><p>The heater keeps the exposed camera optics clear through changing night-time conditions.</p></li>
          </ol>
        </section>

        <section class="controller-project" aria-labelledby="controller-title">
          <div class="controller-project__intro">
            <div>
              <p class="eyebrow">Open-source controller</p>
              <h2 id="controller-title">Build the monitor<br>and dew controller.</h2>
            </div>
            <div>
              <p>The Arduino firmware and Windows serial-monitor application used for this project are available in the FlapAstro GitHub repository. The package includes the source code, compiled Windows application, wiring guide, serial protocol, and known limitations.</p>
              <div class="controller-project__actions">
                <a class="button button--dark" href="https://github.com/rakla123/arduino-serial-monitor" target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a>
                <a class="text-link" href="https://github.com/rakla123/arduino-serial-monitor/releases/latest" target="_blank" rel="noreferrer">Download latest release <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>

          <div class="controller-prerequisites">
            <p class="system-label">Hardware prerequisites</p>
            <div class="controller-prerequisites__grid">
              <article><span>01</span><h3>Controller</h3><p>A classic Arduino Nano-compatible ATmega328P board and a data-capable USB cable.</p></article>
              <article><span>02</span><h3>Environment sensor</h3><p>An external SHT31 or SHT35 I²C breakout, normally at address <code>0x44</code>. Connect SDA to A4 and SCL to A5.</p></article>
              <article><span>03</span><h3>Heater driver</h3><p>A correctly rated logic-level N-channel MOSFET, gate resistor and pull-down, fused heater supply, suitable wiring, and a common ground.</p></article>
              <article><span>04</span><h3>Windows computer</h3><p>A Windows 10 or 11 computer with a free USB port and .NET Framework 4.7.2 or newer.</p></article>
            </div>
          </div>

          <div class="controller-installation">
            <article>
              <p class="system-label">Arduino firmware</p>
              <h3>Compile and upload</h3>
              <ol>
                <li>Install Arduino IDE, then add <strong>Adafruit SHT31 Library</strong> and its <strong>Adafruit BusIO</strong> dependency through the Library Manager.</li>
                <li>Open <code>firmware/DewControlAllSkyCam/DewControlAllSkyCam.ino</code> from the repository.</li>
                <li>Select <strong>Arduino Nano</strong>, the correct COM port, and the appropriate processor. Older clones may require <strong>ATmega328P (Old Bootloader)</strong>.</li>
                <li>Confirm the sensor address is <code>0x44</code>, or change it to <code>0x45</code> when required by the breakout.</li>
                <li>Upload the sketch and verify plausible temperature, humidity, dew-point, and PWM values in Serial Monitor at <strong>9600 baud</strong>.</li>
              </ol>
            </article>
            <article>
              <p class="system-label">Windows application</p>
              <h3>Extract and run</h3>
              <ol>
                <li>Download <code>Arduino-Serial-Monitor-1.0.0.zip</code> from the GitHub Releases page.</li>
                <li>Optionally compare its SHA-256 digest with the adjacent checksum file.</li>
                <li>Extract the ZIP into a writable folder; no installer or administrator access is required.</li>
                <li>Close Arduino IDE Serial Monitor so it releases the COM port, then run <code>ArduinoSerialMonitor.exe</code>.</li>
                <li>Let the application detect the Nano automatically, or select its COM port manually. The monitor reconnects when the device becomes available again.</li>
              </ol>
            </article>
          </div>

          <aside class="controller-warning" aria-label="Electrical safety warning">
            <strong>D5 is a control signal only.</strong>
            <p>Never power a heater directly from an Arduino pin. Use a suitable MOSFET driver, fuse, external heater supply, and common ground. Verify that the heater remains off during reset, sensor failure, and USB disconnection before unattended use.</p>
          </aside>
        </section>
      </section>
    </main>`,
});

const software = layout({
  title: "Software — FlapAstro",
  description: "Astronomy software and PixInsight tools created by FlapAstro.",
  active: "software",
  body: `
    <main id="main">
      <section class="page-intro">
        <p class="eyebrow">Software</p>
        <h1>Tools for the<br>imaging workflow.</h1>
        <p>Small, focused projects created to make astrophotography processing more direct and accessible.</p>
      </section>
      <section class="software section section--page" aria-label="Software projects">
        <div class="software-intro"><p class="eyebrow">PixInsight</p><h2>Process with<br>less friction.</h2><p>Personal projects built around practical imaging needs and shared with the astrophotography community.</p></div>
        <article class="software-card">
          <div class="software-topline"><span class="status-dot"></span><span>PixInsight script</span><span class="version">v0.9.0 beta</span></div>
          <h3>RC-Astro CLI Wrapper</h3>
          <p>A graphical interface for running BlurXTerminator, StarXTerminator, and NoiseXTerminator through the RC-Astro command-line tools—directly from PixInsight.</p>
          <ul><li>GUI parameter configuration</li><li>Execution progress and error handling</li><li>Automatic output loading and STF transfer</li></ul>
          <div class="software-actions"><a class="button button--dark" href="https://github.com/rakla123/pixinsight-updates" target="_blank" rel="noreferrer">Source &amp; documentation <span aria-hidden="true">↗</span></a><a class="text-link" href="https://rakla123.github.io/pixinsight-updates/" target="_blank" rel="noreferrer">PixInsight repository ↗</a></div>
          <p class="requirement">Requires PixInsight and a separately installed, licensed RC-Astro CLI.</p>
        </article>
      </section>
    </main>`,
});

export const pages = [
  { path: "/", output: "index.html", html: home },
  { path: "/gallery/", output: "gallery/index.html", html: gallery },
  { path: "/about/", output: "about/index.html", html: about },
  { path: "/equipment/", output: "equipment/index.html", html: equipment },
  { path: "/allsky/", output: "allsky/index.html", html: allsky },
  { path: "/software/", output: "software/index.html", html: software },
];
