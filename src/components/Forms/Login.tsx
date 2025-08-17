// Third-party dependencies
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";

// Current project dependencies
import { LoginDtoSchema, type LoginDto } from "../../schemas/auth/login";

export default function LoginForm() {
  const [form, setForm] = useState<LoginDto>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginDto, string>>>(
    {},
  );
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerMessage(null);

    const parsed = LoginDtoSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: typeof errors = {};

      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof LoginDto] = err.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", form);

      setServerMessage(response.data.message);

      if (response.data.success) {
        // Redirect to login
        window.location.href = "/";
      }
    } catch (err: any) {
      setServerMessage(err.response?.data?.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-10 mx-auto min-h-screen w-full rounded-xl rounded-tl-none rounded-bl-none bg-white p-4 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
        Iniciar sesión
      </h2>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {serverMessage && (
          <p className="text-center text-blue-600 dark:text-blue-400">
            {serverMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
        ¿No tienes una cuenta?{" "}
        <a href="/auth/register" className="text-blue-600 dark:text-blue-400">
          Regístrate
        </a>
      </p>
    </div>
  );
}
