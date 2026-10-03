import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstWord } from "../../lib/utils";


export default function LoginPage() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const user = {
            id: 1,
            ...login,
            name: capitalizeFirstWord(login.email.split("@")[0]),
            role: "admin",
        };
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("User", JSON.stringify(user));
        navigate("/food-menu", {replace: true});
    }

    return (
        <div className="flex-1 min-h-screen bg-taupe-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="your@email.com"
                    onChange={(e) => setLogin({...login, email: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                    type="password" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="••••••••"
                    onChange={(e) => setLogin({...login, password: e.target.value})}
                    />
                </div>

                <div className="flex justify-end items-center">
                    <a href="#" className="text-sm text-primary hover:primary">Forgot password?</a>
                </div>

                <button 
                    className="w-full bg-primary hover:bg-primary text-white font-medium py-2.5 rounded-lg transition-colors" 
                    type="submit"
                >
                    Login
                </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                Don't have an account? 
                <a href="#" className="text-primary hover:primary font-medium">Register</a>
                </div>
            </div>
        </div>
    );
}