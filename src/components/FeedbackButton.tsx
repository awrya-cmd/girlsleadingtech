export function FeedbackButton() {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSeRE1g3tyUfgZ7UyqH3jGGIkQsJ2jfKlJaumpwGa_tPZeYcJQ/viewform"
      target="_blank"
      rel="noreferrer noopener"
      className="glt-feedback-btn pointer-events-auto hidden md:flex items-center gap-2 px-4 py-2.5 bg-[#ffed95] border-2 border-r-0 border-black shadow-[-2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#ffeef2] cursor-pointer font-bold text-xs uppercase rounded-t-lg"
      style={{ fontFamily: "'Satoshi', sans-serif" }}
    >
      <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span>Feedback</span>
    </a>
  );
}
