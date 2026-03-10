import { useState } from "react";
import axios from "axios";

interface Props {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: Props) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const url = isRegister
        ? "http://localhost:8080/api/auth/register"
        : "http://localhost:8080/api/auth/login";

      const body = isRegister
        ? { name, email, password }
        : { email, password };

      const res = await axios.post(url, body);
      onLogin(res.data.token);
    } catch (e: any) {
      setError("Fehler beim Einloggen. Bitte prüfe deine Daten.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">JobTracker</h1>
        <p className="text-gray-400 text-center mb-8">
          {isRegister ? "Konto erstellen" : "Willkommen zurück"}
        </p>

        {isRegister && (
          <input
            className="w-full bg-gray-800 rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="w-full bg-gray-800 rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full bg-gray-800 rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Passwort"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-3 font-semibold transition"
        >
          {isRegister ? "Registrieren" : "Einloggen"}
        </button>

        <p className="text-center text-gray-400 mt-6 text-sm">
          {isRegister ? "Bereits ein Konto?" : "Noch kein Konto?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-400 hover:underline"
          >
            {isRegister ? "Einloggen" : "Registrieren"}
          </button>
        </p>
      </div>
    </div>
  );
}