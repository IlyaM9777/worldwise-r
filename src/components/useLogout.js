import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    }, // by { replace: true } we erase the place where we were earlier
  });

  return { logout, isPending };
}
