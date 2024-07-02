import './Modal.css';

const Modal = ({outcome, startNewGame, endGame}) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{`You ${outcome}! Play again?`}</p>
                <div className="modal-buttons">
                    <button onClick={startNewGame}>Ok</button>
                    <button onClick={endGame}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;