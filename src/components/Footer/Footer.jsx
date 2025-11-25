import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">
          © {new Date().getFullYear()} ATS — Desarrollado por <span>Emanuel Sanchez</span>
        </p>
      </div>
    </footer>
  );
}