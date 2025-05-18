import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../api/security/decode-jwt";
import type { User } from "../api/users/users";
import { getCurrentUser, updateUser } from "../api/users/users";

export function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", password: "" });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      const userId = getUserIdFromToken(token!);
      const data = await getCurrentUser(userId);
      setUser(data);
    } catch (err) {
      console.error("Erro ao buscar usuário", err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setError("");

    if (form.password.trim() && form.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    const payload: Partial<User> = {};
    if (form.name.trim()) payload.name = form.name;
    if (form.password.trim()) payload.password = form.password;

    if (Object.keys(payload).length === 0) {
      setError("Nenhuma alteração feita.");
      return;
    }

    try {
      await updateUser(user.id, payload);
      alert("Perfil atualizado com sucesso.");
      setEditing(false);
      setForm({ name: "", password: "" });
      setError("");
      fetchUser();
    } catch (err) {
      console.error("Erro ao atualizar perfil", err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  if (!user) return <div className="p-6">Carregando perfil...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Perfil do Usuário</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {!editing ? (
        <>
          <div className="space-y-4 text-lg">
            <div>
              <strong>Nome:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Criado em:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setEditing(true);
                setForm({ name: "", password: "" });
                setError("");
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 cursor-pointer"
            >
              Editar Perfil
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Novo nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="password"
            placeholder="Nova senha (opcional)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setForm({ name: "", password: "" });
                setError("");
              }}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 cursor-pointer"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
