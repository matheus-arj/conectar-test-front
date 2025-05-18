import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../../api/auth/login";
import { getRoleFromToken } from "../../api/security/decode-jwt";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = getRoleFromToken(token);
      if (role === "ADMIN") {
        navigate("/dashboard");
      } else if (role === "USER") {
        navigate("/profile");
      } else {
        navigate("/");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(email, password);

      if (response && response.access_token) {
        const token = response.access_token;
        localStorage.setItem("token", token);
        const role = getRoleFromToken(token);

        if (role === "ADMIN") {
          navigate("/dashboard");
        } else if (role === "USER") {
          navigate("/profile");
        } else {
          navigate("/");
        }
      } else {
        setError("Credenciais inválidas. Verifique seu email e senha.");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Credenciais inválidas. Verifique seu email e senha.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Conéctar"
          src="https://pedido.conectarapp.com.br/assets/assets/images/logo-conectar-positivo.11ddcce1c77344bef63c1cc63160f130.svg"
          className="mx-auto h-25 w-auto"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Senha
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center -mt-2">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não é membro?{" "}
          <Link
            to="/register"
            className="font-semibold text-green-600 hover:text-green-500"
          >
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
