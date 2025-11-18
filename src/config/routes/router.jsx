import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Login from "../../components/pages/Login";
import Register from "../../components/pages/Register";
import About from "../../components/pages/About";
import ProtectedRoute from "../../components/auth/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenue</h1>
                    <p className="text-gray-600">Page d'accueil de l'application</p>
                </div>,
            },
            {
                path: "about",
                element: (
                    <ProtectedRoute>
                        <About />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    }
]);

const Routes = () => {
    return <RouterProvider router={router} />;
}
export default Routes;