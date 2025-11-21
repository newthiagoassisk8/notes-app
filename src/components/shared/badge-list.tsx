import { useState } from 'react';
// TODO resolver o clique do botão para ficar selecionado a oção
type BadgeProps = {
    children: React.ReactNode;
    onClick?: () => void;
    title?: string;
};
const Badge: React.FC<BadgeProps> = ({ children, onClick, title }) => (
    <button
        type="button"
        title={title ?? String(children)}
        onClick={onClick}
        className={`inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-200 ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
        {children}
    </button>
);

type BadgeListProps = {
    tags: string[];
    onTagClick?: (tag: string) => void;
    limit?: number;
    className?: string;
};

export const BadgeList: React.FC<BadgeListProps> = ({ tags, onTagClick, className }) => {
    const [limit, setlimit] = useState(5);

    if (!tags) return null;

    const uniqueTags = Array.from(new Set(tags));
    const items = uniqueTags.slice(0, limit);
    // Se o número de tags ultrapassar o limite, calcula o excedente. Caso contrário, retorna false.
    const extraTagsCount = uniqueTags.length > limit ? uniqueTags.length - limit : false;

    return (
        <div className={`flex flex-wrap gap-2 ${className ?? ''}`} aria-label="tags">
            {items.map((tag) => (
                <Badge key={tag} onClick={onTagClick ? () => onTagClick(tag) : undefined}>
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
