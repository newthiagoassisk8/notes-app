import { useState } from 'react'

type BadgeProps = {
  children: React.ReactNode
  onClick?: () => void
  title?: string
}
const Badge: React.FC<BadgeProps> = ({ children, onClick, title }) => (
  <button
    type="button"
    title={title ?? String(children)}
    onClick={onClick}
    className={`inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-200 ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
  >
    {children}
  </button>
)

type BadgeListProps = {
  tags: string[]
  onTagClick?: (tag: string) => void
  limit?: number
  className?: string
}

export const BadgeList: React.FC<BadgeListProps> = ({
  tags,
  onTagClick,
  className,
}) => {
  const [limite, setLimite] = useState(5)

  if (!tags) return null

  const uniqueTags = Array.from(new Set(tags))
  console.log('uniqueTags')
  console.log(uniqueTags)
  const unique = Array.from(new Set(Object.values(tags))).filter(Boolean)
  const items = typeof limite === 'number' ? unique.slice(0, limite) : unique

  const hiddenCount =
    typeof limite === 'number' && unique.length > limite
      ? unique.length - limite
      : 0

  return (
    <div
      className={`flex flex-wrap gap-2 ${className ?? ''}`}
      aria-label="tags"
    >
      {items.map((tag) => (
        <Badge
          key={tag}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
        >
          {tag}
        </Badge>
      ))}

      {hiddenCount > 0 && (
        <Badge
          title={`+${hiddenCount} tags`}
          onClick={() => setLimite(Number(Object.values(tags).length))}
        >
          Ver mais
        </Badge>
      )}
    </div>
  )
}
