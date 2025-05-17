import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../api/users/users";

export function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (form.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res.status === 201) {
        alert("Usuário registrado com sucesso!");
        setSuccess(true);
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
        navigate("/");
      }
    } catch (err) {
      setError("Erro ao registrar usuário.");
      console.error(err);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto h-screen flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-10">
        <img
          alt="Conéctar"
          src="https://pedido.conectarapp.com.br/assets/assets/images/logo-conectar-positivo.11ddcce1c77344bef63c1cc63160f130.svg"
          className="mx-auto h-25 w-auto"
        />
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">Registre-se</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Senha (mínimo 8 caracteres)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          required
          className="w-full p-2 border rounded"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm">
            Usuário registrado com sucesso!
          </p>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 w-full"
        >
          Registrar
        </button>
      </form>

      <p className="mt-4 text-center">
        Já tem uma conta?{" "}
        <a href="/" className="text-green-600 hover:underline">
          Faça login
        </a>
      </p>
    </div>
  );
}
