import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    icon,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium leading-5 rounded-full transition-all duration-200 hover:shadow-sm ' +
                (active
                    ? 'text-cardinal bg-cardinal/5 hover:bg-cardinal/10'
                    : 'text-port-gore hover:text-cardinal hover:bg-port-gore/5') +
                (className ? ' ' + className : '')
            }
        >
            {icon && <span className="w-4 h-4 transition-colors duration-200">{icon}</span>}
            {children}
        </Link>
    );
}
