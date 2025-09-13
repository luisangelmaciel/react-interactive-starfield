// FIX: Switched to React namespace import to resolve JSX intrinsic element type errors.
import * as React from 'react';

const RuPaul: React.FC = () => {
    return (
        <div className="rupaul-container">
            <div className="astronaut x">
                <div className="y">
                    <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6cf3dcf4-3e01-439f-8e79-bc764099ba54/dc3qkn2-79ee5cfe-f572-4bf0-99d5-a217b0ce1a77.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZjZjNkY2Y0LTNlMDEtNDM5Zi04ZTc5LWJjNzY0MDk5YmE1NFwvZGMzcWtuMi03OWVlNWNmZS1mNTcyLTRiZjAtOTlkNS1hMjE3YjBjZTFhNzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.usEnOQE1g6gq800PaBWp7VqKLW1eRPsjfLHUcrA0z3E" alt="RuPaul as an astronaut" />
                </div>
            </div>
            <div className="black-hole"></div>
            <a href="https://github.com/luisangelmaciel" className="fixed top-5 right-20 text-white/50 hover:text-white transition-colors" aria-label="GitHub Profile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github fa-2x"></i>
            </a>
        </div>
    );
};

export default RuPaul;