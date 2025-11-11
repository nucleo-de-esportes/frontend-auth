import { useAlert } from "../context/AlertContext";

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

export const useApiAlert = () => {
  const { addAlert } = useAlert();

  const handleApiResponse = (
    response: ApiResponse,
    successMessage?: string
  ) => {
    if (response.success) {
      addAlert(
        successMessage || response.message || "Operação realizada com sucesso!",
        "success"
      );
    } else {
      addAlert(
        response.error || response.message || "Ocorreu um erro inesperado.",
        "error"
      );
    }
  };

  const showAlert = (
    type: "success" | "error" | "info" | "warning",
    message: string,
    title?: string,
    duration?: number
  ) => {
    addAlert(message, type, {
      title,
      duration,
    });
  };

  return {
    handleApiResponse,
    showAlert,
  };
};
