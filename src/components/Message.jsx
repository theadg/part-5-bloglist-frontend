import React from 'react'

export const Message = ({ message, isSuccess }) => {
    const colorToUse = isSuccess ? 'green' : 'red'

    const styles = {
        color: colorToUse,
        borderStyle: 'solid',
        borderColor: colorToUse,
        borderWidth: '0.25rem',
        backgroundColor: 'gray',
        padding: '1rem',
        fontSize: '2rem'
    }

    return <div className="message" style={styles}>{message}</div>
}
