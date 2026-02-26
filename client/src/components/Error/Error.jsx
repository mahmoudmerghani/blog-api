import "./Error.css";

export default function Error({ error, onTryAgain }) {
    return (
        <div className="error">
            <span className="error-icon">&#9888;&#65039;</span>
            <p className="error-message">{error}</p>
            <button className="error-btn" onClick={onTryAgain}>
                Try again
            </button>
        </div>
    );
}
