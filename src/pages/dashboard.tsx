import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { User } from "../api/users/users";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../api/users/users";

export function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER";
  }>({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const list = await getUsers();
    setUsers(list);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await createUser(form);
    setForm({ name: "", email: "", password: "", role: "USER" });
    setShowCreate(false);
    fetchUsers();
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingUser) return;

    const payload: Partial<User> = {};
    if (form.name.trim()) payload.name = form.name;
    if (form.email.trim()) payload.email = form.email;
    if (form.password.trim()) payload.password = form.password;

    if (Object.keys(payload).length === 0) {
      alert("Preencha pelo menos um campo para atualizar.");
      return;
    }

    await updateUser(editingUser.id, payload);
    setEditingUser(null);
    setForm({ name: "", email: "", password: "", role: "USER" });
    fetchUsers();
  }

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
      await deleteUser(id);
      fetchUsers();
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard - Usuários</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 cursor-pointer"
        >
          Logout
        </button>
      </div>
      <button
        onClick={() => setShowCreate(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 cursor-pointer"
      >
        Criar novo usuário
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Nome</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => {
                    setEditingUser(user);
                    setForm({
                      name: "",
                      email: "",
                      password: "",
                      role: "USER",
                    });
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded cursor-pointer"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <form
            onSubmit={handleCreate}
            className="bg-white p-6 rounded shadow space-y-4 min-w-[300px]"
          >
            <h2 className="text-xl font-bold">Criar usuário</h2>
            <input
              placeholder="Nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Senha"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as "ADMIN" | "USER" })
              }
              className="w-full p-2 border rounded"
            >
              <option value="USER">Usuário</option>
              <option value="ADMIN">Administrador</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Criar
              </button>
            </div>
          </form>
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded shadow space-y-4 min-w-[300px]"
          >
            <h2 className="text-xl font-bold">Editar usuário</h2>
            <input
              placeholder="Novo nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border rounded cursor: poj"
            />
            <input
              placeholder="Novo email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Nova senha"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
