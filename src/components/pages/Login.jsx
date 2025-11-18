import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/authStore";

    const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
        email: "",
        password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
        await login(data);
        navigate("/about");
        } catch (error) {
        console.log(error.message);
        alert("Erreur de connexion");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="mx-auto p-4 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Connexion</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "L'email est requis",
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email invalide",
                        },
                    })}
                    />
                    {errors.email && (
                    <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    {...register("password", {
                        required: "Le mot de passe est requis",
                        minLength: {
                        value: 6,
                        message: "Le mot de passe doit contenir au moins 6 caractères",
                        },
                    })}
                    />
                    {errors.password && (<p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>)}
                </div>

                <div className="flex items-center justify-between">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
                    type="submit"
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? "Connexion..." : "Se connecter"}
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Pas encore de compte ?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="text-blue-500 hover:text-blue-700 font-bold"
                        >
                            S'inscrire
                        </button>
                    </p>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Login;