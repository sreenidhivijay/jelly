import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import subscriptionService from "../services/subscriptionService";

export const subscriptionKeys = {
  mine: ["subscription", "mine"],
  tiers: ["subscription", "tiers"],
};

export function useMySubscription() {
  return useQuery({
    queryKey: subscriptionKeys.mine,
    queryFn: () => subscriptionService.getMySubscription(),
  });
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => subscriptionService.cancelSubscription(),
    onSuccess: (data) => {
      queryClient.setQueryData(subscriptionKeys.mine, data);
    },
  });
}

export function useReactivateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => subscriptionService.reactivateSubscription(),
    onSuccess: (data) => {
      queryClient.setQueryData(subscriptionKeys.mine, data);
    },
  });
}
