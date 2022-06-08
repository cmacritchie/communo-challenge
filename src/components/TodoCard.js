import React from 'react'

export default ({ children }) => {
    return (
            <div className="row">
                <div className="">
                    <div className="card">
                        <div className="card-content">
                        {children}
                        </div>
                    </div>
                </div>
            </div>
        )
}