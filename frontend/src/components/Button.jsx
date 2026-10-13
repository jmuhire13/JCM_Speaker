import { Link } from 'react-router-dom'

// The one reusable button. "ink" is the default; "cream" is for dark bands.
// On hover an ember layer wipes in from the left.
// With a `to` it is a link; without one it is a real <button> (use that one in forms).
const variants = {
  ink: 'bg-ink text-cream',
  cream: 'bg-cream text-ink',
}

export default function Button({
  to,
  children,
  variant = 'ink',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}) {
  const classes = `group relative inline-block overflow-hidden px-7 py-[18px] font-body text-[15px] font-semibold ${variants[variant]} ${className}`

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="bg-ember absolute inset-0 origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100"
      />
      <span className="relative transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
    </>
  )

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes}>
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {inner}
    </button>
  )
}
