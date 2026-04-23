import './Button.css'

export const Button = ({ 
  label, 
  variant = 'primary', 
  size = 'medium', 
  onClick 
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};
