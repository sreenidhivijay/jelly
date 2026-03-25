import { useQuery, useMutation } from "@tanstack/react-query";
import stripeConnectService from "../services/stripeConnectService";

export const stripeKeys = {
  status: ["stripe", "status"],
};

export function useStripeStatus() {
  return useQuery({
    queryKey: stripeKeys.status,
    queryFn: () => stripeConnectService.getStatus(),
  });
}

export function useStartStripeOnboarding() {
  return useMutation({
    mutationFn: ({ returnUrl, refreshUrl }) =>
      stripeConnectService.startOnboarding(returnUrl, refreshUrl),
  });
}
