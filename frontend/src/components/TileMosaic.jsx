// A wall of rounded photo tiles drifting slowly up and down, used as a dim texture behind
// an opening. Columns alternate direction. Decorative only (hidden from screen readers).
// Pass `tiles` as an array of image URLs. It needs at least 2 per column to loop smoothly.
export default function TileMosaic({ tiles }) {
  const columns = [[], [], [], []]
  tiles.forEach((src, i) => columns[i % 4].push(src))

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex gap-4 overflow-hidden px-4 opacity-45"
    >
      {columns.map((col, c) => (
        <div
          key={c}
          className={`flex w-1/2 shrink-0 flex-col gap-4 md:w-1/4 ${c % 2 ? 'drift-down' : 'drift-up'} ${
            c > 1 ? 'hidden md:flex' : ''
          }`}
        >
          {[...col, ...col].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      ))}
    </div>
  )
}
