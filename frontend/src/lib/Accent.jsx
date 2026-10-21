// Renders a headline with one phrase highlighted, e.g.
//   <Accent text="What your people walk away with" word="walk away" />
// The phrase takes the gold colour (or the className you pass).
export default function Accent({ text, word, className = 'text-gold' }) {
  const i = text.toLowerCase().indexOf(word.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <span className={className}>{text.slice(i, i + word.length)}</span>
      {text.slice(i + word.length)}
    </>
  )
}
