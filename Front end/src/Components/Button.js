const Button = ({ listener, icon, text, isDisabled, buttonStyling, styling }) => {
    return (
        <button
            disabled={isDisabled}
            onClick={listener}
            className={buttonStyling}>
            <div className="flex justify-between items-center">
                <div className="inline-flex items-center">
                    <div className="text-gray-500">{icon}</div>
                    <span className={styling}>{text}</span>
                </div>
            </div>
        </button>
    );
}

export default Button;