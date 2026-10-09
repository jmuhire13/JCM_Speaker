import { Link } from 'react-router-dom'

// The one reusable button. "ink" is the default; "cream" is for dark bands.
// On hover an ember layer wipes in from the left.
const variants = {
  ink: 'bg-ink text-cream',
  cream: 'bg-cream text-ink',
}

export default function Button({ to, children, variant = 'ink', className = '', onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group relative inline-block overflow-hidden px-7 py-[18px] font-body text-[15px] font-semibold ${variants[variant]} ${className}`}
    >
      <span
        aria-hidden="true"
        className="bg-ember absolute inset-0 origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100"
      />
      <span className="relative transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
    </Link>
  )
}
