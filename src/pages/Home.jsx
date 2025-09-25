import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faMobileAlt, 
  faCloud, 
  faChartLine, 
  faProjectDiagram, 
  faHandshake, 
  faQuoteLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import styles from './css/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>
            Your Vision. <br /> Our Engineered Solution.
          </h1>
          <p>
            We are <strong>PrimeSoft</strong>, a dedicated team of elite software engineers and designers 
            committed to transforming complex ideas into powerful, scalable, and impactful 
            digital realities.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.ctaButton}>
              Start a Project <FontAwesomeIcon icon={faArrowRight} className={styles.svgInline} />
            </button>
            <button className={styles.learnMoreButton}>
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>The PrimeSoft Edge</h2>
          <p>Innovating for a smarter tomorrow through deep expertise and agile partnership.</p>
        </div>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h3>Partnership in Engineering Excellence.</h3>
            <p>
              Founded in 2018, PrimeSoft was born from a passion for technology and a vision to create software that
              solves <strong>mission-critical challenges</strong>. Our core mission is to partner with businesses of all sizes to help them
              leverage the power of custom software, automation, and advanced data analytics to secure a significant competitive edge.
            </p>
            <p>
              We believe in a truly collaborative approach, immersing ourselves in your business from the initial concept through to successful launch
              and post-deployment support. Our commitment is defined by <strong>agile methodologies</strong>, <strong>transparent processes</strong>, and an uncompromising dedication to quality, ensuring every project not only meets its goals but sets a new standard.
            </p>
          </div>
          <div className={styles.aboutImageContainer}>
            <img src="https://placehold.co/600x400/152A4A/fff?text=Strategic+Teamwork" alt="A team working together on a strategic project" className={styles.aboutImage} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`${styles.section} ${styles.servicesSection}`}>
        <div className={styles.sectionHeader}>
          <h2>Our Core Expertise</h2>
          <p>Full-spectrum digital services designed for performance and scalability.</p>
        </div>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FontAwesomeIcon icon={faCode} /></div>
            <h3>Custom Web & SaaS</h3>
            <p>
              Crafting responsive, secure, and scalable web applications and Software-as-a-Service (SaaS) platforms.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FontAwesomeIcon icon={faMobileAlt} /></div>
            <h3>Enterprise Mobile</h3>
            <p>
              Building intuitive, high-performing mobile apps for both consumer and enterprise use on iOS and Android.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FontAwesomeIcon icon={faCloud} /></div>
            <h3>Cloud & Infrastructure</h3>
            <p>
              Designing and implementing robust, cost-efficient cloud architectures (AWS, Azure, GCP) for maximum uptime.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FontAwesomeIcon icon={faChartLine} /></div>
            <h3>Data Science & AI/ML</h3>
            <p>
              Unlocking deep insights from your data with powerful analytics, Machine Learning models, and AI integration.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FontAwesomeIcon icon={faProjectDiagram} /></div>
            <h3>DevOps & CI/CD</h3>
            <p>
              Streamlining your software delivery with automated, continuous integration and deployment pipelines.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}><FontAwesomeIcon icon={faHandshake} /></div>
            <h3>Strategic Consulting</h3>
            <p>
              Providing expert, technical strategic guidance to successfully navigate complex digital transformation roadmaps.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Featured Case Studies</h2>
          <p>Results-driven solutions that have redefined our clients' market positions.</p>
        </div>
        <div className={styles.portfolioGrid}>
          <div className={styles.portfolioItem}>
            <img src="https://placehold.co/800x600/212529/FF6B6B?text=Fintech+Dashboard" alt="Project Alpha UI design" />
            <div className={styles.portfolioOverlay}>
              <h4>Fintech | Pulse Dashboard</h4>
              <p>Built a high-frequency financial trading dashboard for a global fintech startup, achieving $50M in seed funding.</p>
            </div>
          </div>
          <div className={styles.portfolioItem}>
            <img src="https://placehold.co/800x600/333333/FF6B6B?text=Logistics+App" alt="Project Beta mobile app screen" />
            <div className={styles.portfolioOverlay}>
              <h4>Logistics | GreenRoute</h4>
              <p>Developed a cross-platform mobile app that reduced vehicle idle time by 15% for a sustainable delivery company.</p>
            </div>
          </div>
          <div className={styles.portfolioItem}>
            <img src="https://placehold.co/800x600/444444/FF6B6B?text=eCommerce+Platform" alt="Project Gamma web application" />
            <div className={styles.portfolioOverlay}>
              <h4>E-Commerce | Stellar Shop</h4>
              <p>A comprehensive, scalable e-commerce platform with integrated personalized AI product recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Client Endorsements</h2>
        </div>
        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <FontAwesomeIcon icon={faQuoteLeft} className={styles.quoteIcon} />
            <p>
              "PrimeSoft completely transformed our core business platform. Their deep technical expertise and professional
              attention to detail were instrumental in launching our new system on time, under budget, and exceeding performance KPIs."
            </p>
            <div className={styles.clientInfo}>
              <span className={styles.clientName}>Jane Doe</span>
              <span className={styles.clientTitle}>CEO, Innovate Inc.</span>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <FontAwesomeIcon icon={faQuoteLeft} className={styles.quoteIcon} />
            <p>
              "Working with the PrimeSoft team was a masterclass in collaboration. They were true strategic partners in our digital
              transformation journey, providing invaluable guidance and delivering exceptional, high-quality code."
            </p>
            <div className={styles.clientInfo}>
              <span className={styles.clientName}>John Smith</span>
              <span className={styles.clientTitle}>CTO, Tech Solutions</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className={styles.ctaSectionFinal}>
        <div className={styles.ctaContent}>
          <h3>Ready to Engineer Your Next Success?</h3>
          <p>
            Let's schedule a strategic consultation to discuss how our custom software solutions 
            can optimize your operations and elevate your market presence.
          </p>
          <button className={styles.ctaButton}>
            Get in Touch Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
