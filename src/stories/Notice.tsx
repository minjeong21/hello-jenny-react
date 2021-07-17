
import React from "react";
import { Button } from "./Button";
import "./header.css";

export interface HeaderProps {
    user?: {};
    onSignIn: () => void;
    onLogout: () => void;
    onCreateAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    user,
    onSignIn,
    onLogout,
    onCreateAccount,
}) => (
    <header>

        <header className="flex justify-center">
            <div className="bg-white rounded-3xl flex text-gray-700 items-center px-5 py-2  shadow">
                <img
                    className="w-6 h-7 mr-2"
                    src="/assets/small-quokka.png"
                    alt="quokka character"
                />

                <div className="text-gray-800 text-sm">
                    원하는 <b>테마</b>와 <b>난이도</b>를 선택할 수 있어요!
                </div>
            </div>
        </header>

    </header>
);
