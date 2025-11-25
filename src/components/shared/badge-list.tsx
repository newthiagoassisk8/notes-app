import { useState } from 'react';

type BadgeProps = {
    children: React.ReactNode;
    onClick?: () => void;
    title?: string;
    selected?: boolean;
};
const Badge: React.FC<BadgeProps> = ({ children, onClick, title, selected }) => (
    <button
        type="button"
        title={title ?? String(children)}
        onClick={onClick}
        className={`inline-flex items-center gap-1  rounded-full border border-slate-300
              ${selected ? 'bg-slate-500  border-amber-900' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'}
            bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700
             transition-colors duration-150 hover:bg-slate-200 ${onClick ? 'cursor-pointer' : 'cursor-default '}`}
    >
        {children}
    </button>
);

type BadgeListProps = {
    tags: string[];
    onTagClick?: (tag: string) => void;
    limit?: number;
    className?: string;
    selected?: boolean;
};

export const BadgeList: React.FC<BadgeListProps> = ({ tags, onTagClick, className }) => {
    const [limit, setlimit] = useState(4);
    const [selectedTag, setselectedTag] = useState<string | null>(null);

    function handleBadgeClick(tag: string) {
        setselectedTag(tag);
        onTagClick?.(tag);
    }

    if (!tags) return null;

    const uniqueTags = Array.from(new Set(tags));
    const items = uniqueTags.slice(0, limit);
    // Se o número de tags ultrapassar o limite, calcula o excedente. Caso contrário, retorna false.
    const extraTagsCount = uniqueTags.length > limit ? uniqueTags.length - limit : false;

    return (
        <div className={`flex flex-wrap gap-2   ${className ?? ''}`} aria-label="tags">
            {items.map((tag) => (
                <Badge key={tag} onClick={() => handleBadgeClick(tag)} selected={selectedTag === tag}>
                    {tag}
                </Badge>
            ))}
            {extraTagsCount && (
                <Badge title={`+${extraTagsCount} tags`} onClick={() => setlimit(Number(Object.values(tags).length))}>
                    Ver mais
                </Badge>
            )}
        </div>
    );
};
