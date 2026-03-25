import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token) => api.post("/auth/verify-email", { token }),
  });
}
