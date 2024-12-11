

/**
 * Card Component
 * A container for the entire card, providing a border, rounded corners, and shadow.
 */
export function Card({ children, className = '' }) {
  return (
    <div className={`border rounded-lg shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

/**
 * CardContent Component
 * A container for the main content of the card.
 */
export function CardContent({ children, className = '' }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * CardFooter Component
 * A container for footer content like buttons or additional actions.
 */
export function CardFooter({ children, className = '' }) {
  return (
    <div className={`p-4 pt-0 ${className}`}>
      {children}
    </div>
  );
}
