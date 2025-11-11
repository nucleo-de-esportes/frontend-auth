import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";
import { useApiAlert } from "../hooks/useApiAlert";
import Button from "../components/Button";
import Form from "../components/Form";
import MainContainer from "../components/MainContainer";
import TextInput from "../components/TextInput";
import { type AuthTokenPayload } from "../types/AuthTokenPayload";

const emailValidationSchema = z.string().email("Formato de E-mail inválido");
const passwordValidationSchema = z.string().min(1, "Senha obrigatória");

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { showAlert } = useApiAlert();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validar os dados antes de enviar
    const emailResult = emailValidationSchema.safeParse(formData.email);
    const passwordResult = passwordValidationSchema.safeParse(
      formData.password
    );

    if (!emailResult.success || !passwordResult.success) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Normaliza a resposta - trata ambos formatos (token direto ou dentro de usuario)
      const token = response.data.token || response.data.usuario?.token;

      if (!token) {
        throw new Error("Token não encontrado na resposta");
      }

      // Salva o token no localStorage
      localStorage.setItem("auth_token", token);

      // Decodifica o token para obter o user_type
      const decoded = jwtDecode<AuthTokenPayload>(token);
      const userType = decoded.user_metadata.user_type;

      showAlert(
        "success",
        "Login realizado com sucesso!",
        "Login Realizado",
        2000
      );

      // Redireciona para o frontend correto baseado no user_type
      setTimeout(() => {
        if (userType === "admin") {
          window.location.href = "/admin/turmas";
        } else if (userType === "aluno") {
          window.location.href = "/aluno/home";
        } else if (userType === "professor") {
          window.location.href = "/professor/home";
        } else {
          showAlert("error", "Tipo de usuário desconhecido", "Erro");
        }
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const apiErrorMessage =
          err.response?.data?.message ||
          (typeof err.response?.data === "string"
            ? err.response.data
            : "Erro no login. Verifique suas credenciais.");

        showAlert("error", apiErrorMessage, "Erro no Login", 1500);
      } else {
        showAlert("error", "Erro inesperado. Tente novamente.", "Erro");
        console.error("Erro inesperado:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Verificar se os campos são válidos para habilitar/desabilitar o botão
  const isEmailValid = emailValidationSchema.safeParse(formData.email).success;
  const isPasswordValid = passwordValidationSchema.safeParse(
    formData.password
  ).success;

  const isDisabled =
    loading ||
    !isEmailValid ||
    !isPasswordValid ||
    !formData.email.trim() ||
    !formData.password.trim();

  return (
    <MainContainer>
      <Form title="Núcleo de Esportes" onSubmit={handleSubmit}>
        <TextInput
          label="E-mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          validation={emailValidationSchema}
        />

        <TextInput
          label="Senha"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          validation={passwordValidationSchema}
        />

        <a
          href="/forgot-password"
          className="text-[#BF0087] underline hover:text-[#43054E] transition mb-8"
        >
          Esqueci minha senha
        </a>

        <Button
          text={loading ? "Entrando..." : "Entrar"}
          type="submit"
          disabled={isDisabled}
        />

        <a
          href="/auth/register"
          className="text-[#BF0087] underline hover:text-[#43054E] transition"
        >
          Criar uma conta
        </a>
      </Form>
    </MainContainer>
  );
};

export default Login;
