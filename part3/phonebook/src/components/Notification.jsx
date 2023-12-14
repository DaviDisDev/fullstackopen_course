import React from 'react'
import './Notification.css'
const Notification = ({ message, classMessage }) => {

    if (message === null) {
        return null
    }

    return (
        <div className={classMessage}>
            {message}
        </div>
    )
}
export default Notification