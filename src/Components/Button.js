import { useState } from "react";

const Button = ({icon, text, styling}) => {
    return (
        <div
            className="rounded m-3 cursor-pointer hover:bg-slate-600 relative">
            <div className="flex justify-between items-center">
                <div className="inline-flex items-center">
                    <div className="text-gray-500 ">{icon}</div>
                    <span className={styling}>{text}</span>
                </div>
            </div>
        </div>
    );
}

export default Button;