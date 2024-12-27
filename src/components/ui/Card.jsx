import PropTypes from 'prop-types';

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

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

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

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * CardFooter Component
 * A container for footer content like buttons or additional actions.
 */
export function CardFooter({ children, className = '' }) {
  return (
    <div className={`p-4 border-t ${className}`}>
      {children}
    </div>
  );
}

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};