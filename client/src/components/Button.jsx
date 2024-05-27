import React from 'react'

function Button({
    children,
    className = '',
    ...props
}) {
    return <div className='self-stretch'>
        <button className={className}  {...props}>{children}</button>
    </div>;
}

export default Button;