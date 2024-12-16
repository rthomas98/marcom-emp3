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
                'inline-flex items-center gap-2 border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-cardinal text-port-gore focus:border-cardinal'
                    : 'border-transparent text-port-gore/70 hover:border-port-gore/30 hover:text-port-gore focus:border-port-gore/30 focus:text-port-gore') +
                (className ? ' ' + className : '')
            }
        >
            {icon && <span className="w-4 h-4">{icon}</span>}
            {children}
        </Link>
    );
}
