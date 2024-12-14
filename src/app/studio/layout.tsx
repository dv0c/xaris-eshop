import React, { FC } from 'react'

interface layoutProps {
    children: React.ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
    return <html>
        <body>
            {children}
        </body>
    </html>
}

export default layout