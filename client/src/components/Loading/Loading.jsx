import "./Loading.css";

export default function Loading() {
    return (
        <div className="loading-wrapper">
            <div className="loading-spinner" />
            <p className="loading-text">Loading...</p>
        </div>
    );
}
