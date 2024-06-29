import './Modal.css';

const Modal = ({outcome}) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h1>{`You ${outcome}! Play again?`}</h1>
                <div className="modal-buttons">
                    <button onClick={startNewGame}>Ok</button>
                    <button onClick={endGame}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;