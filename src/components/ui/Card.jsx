function Card({ children, className }) {
  return <div className={`border rounded-lg shadow-md overflow-hidden ${className}`}>{children}</div>;
}

export default Card;