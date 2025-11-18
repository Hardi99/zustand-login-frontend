import useAuthStore from "../../store/authStore";

const About = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">À propos</h1>

                <div className="space-y-4 text-gray-700">
                    <p className="text-lg">
                        Bienvenue sur notre application de démonstration d'authentification avec Zustand et Supabase.
                    </p>

                    {user && (
                        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                            <p className="text-sm text-blue-700 font-semibold mb-2">
                                Informations utilisateur
                            </p>
                            <p className="text-gray-700">
                                <span className="font-medium">Email :</span> {user.email}
                            </p>
                            {user.id && (
                                <p className="text-gray-700">
                                    <span className="font-medium">ID :</span> {user.id}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Technologies utilisées</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-medium">React</span> - Bibliothèque UI</li>
                            <li><span className="font-medium">Zustand</span> - Gestion d'état</li>
                            <li><span className="font-medium">React Router</span> - Routage</li>
                            <li><span className="font-medium">React Hook Form</span> - Gestion des formulaires</li>
                            <li><span className="font-medium">Tailwind CSS</span> - Styles</li>
                            <li><span className="font-medium">Supabase</span> - Backend et authentification</li>
                        </ul>
                    </div>

                    <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                        <p className="text-sm text-yellow-700">
                            <span className="font-semibold">Note :</span> Cette page est protégée et nécessite une authentification pour être accessible.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
