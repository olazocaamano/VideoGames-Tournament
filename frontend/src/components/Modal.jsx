/*
    File: Modal.jsx
    Description: Reusable modal component.
    Displays content inside an overlay with a close button.
    Uses "children" to render dynamic content.
 */

import React from "react";

import "../App.css";

/*
    Modal component
    @param {ReactNode} children - Content to be displayed inside the modal
    @param {Function} onClose - Function to close the modal
 */
function Modal({ children, onClose }) {
    return (
        <div className="modal-overlay">

            {/* Modal container */}
            <div className="modal">

                {/* Close button */}
                <button onClick={onClose}>
                    X
                </button>

                {/* Dynamic content */}
                {children}

            </div>
        </div>
    );
}

export default Modal;