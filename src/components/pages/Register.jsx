import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/useAuth";

const Register = () => {
    const navigate = useNavigate();
    const registerMutation = useRegister();

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password");

    const onSubmit = async (data) => {
        registerMutation.mutate(data, {
            onSuccess: () => {
                navigate("/");
            },
            onError: (error) => {
                alert(error.response?.data?.message || "Erreur lors de l'inscription");
            },
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="mx-auto p-4 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Inscription</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            {...registerField("email", {
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

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            {...registerField("password", {
                                required: "Le mot de passe est requis",
                                minLength: {
                                    value: 6,
                                    message: "Le mot de passe doit contenir au moins 6 caractères",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type="password"
                            {...registerField("confirmPassword", {
                                required: "Veuillez confirmer votre mot de passe",
                                validate: (value) =>
                                    value === password || "Les mots de passe ne correspondent pas",
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
                            type="submit"
                            disabled={registerMutation.isPending}
                        >
                            {registerMutation.isPending ? "Inscription..." : "S'inscrire"}
                        </button>
                    </div>

                    {registerMutation.isError && (
                        <p className="text-red-500 text-sm mt-4 text-center">
                            {registerMutation.error?.response?.data?.message || "Erreur lors de l'inscription"}
                        </p>
                    )}

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Vous avez déjà un compte ?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-blue-500 hover:text-blue-700 font-bold"
                            >
                                Se connecter
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
