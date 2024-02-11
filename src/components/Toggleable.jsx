import React, { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef(({ children, buttonLabel }, refs) => {
    const [isVisible, setIsVisible] = useState(false)
    const hideForm = { display: isVisible ? 'none' : '' }
    const showForm = { display: isVisible ? '' : 'none' }

    const toggleVisibility = () => setIsVisible(!isVisible)

    // Expose toggleVisibility outside of the component thru REF
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            {/* Show Children Button */}
            <button
                type="button"
                style={hideForm}
                onClick={toggleVisibility}
            >
                {buttonLabel}
            </button>

            {/* Children  */}
            <div style={showForm}>
                {children}

                {/* Hide Children Button */}
                <button
                    type="button"
                    onClick={toggleVisibility}
                >
                    cancel
                </button>
            </div>
        </div>
    )
})

export default Toggleable
