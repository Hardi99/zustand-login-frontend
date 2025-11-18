import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { useLogout } from "../../hooks/useAuth";

const Layout = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                navigate("/login");
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <Link to="/" className="text-xl font-bold text-blue-600">
                                MyApp
                            </Link>
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Accueil
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                À propos
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            {user ? (
                                <>
                                    <span className="text-gray-700 text-sm">
                                        {user.email}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Déconnexion
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Inscription
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
