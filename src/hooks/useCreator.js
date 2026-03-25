import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import creatorService from "../services/creatorService";

export const creatorKeys = {
  profile: ["creator", "profile"],
  introVideo: ["creator", "introVideo"],
  portfolio: ["creator", "portfolio"],
};

export function useCreatorProfile() {
  return useQuery({
    queryKey: creatorKeys.profile,
    queryFn: () => creatorService.getProfile(),
  });
}

export function useUpdateCreatorProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (fields) => creatorService.updateProfile(fields),
    onSuccess: (data) => {
      queryClient.setQueryData(creatorKeys.profile, data);
    },
  });
}

export function useUploadCreatorPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file) => creatorService.uploadProfilePhoto(file),
    onSuccess: (data) => {
      queryClient.setQueryData(creatorKeys.profile, (old) => ({
        ...old,
        profile_image_url: data.profile_image_url,
      }));
    },
  });
}

export function useCreatorIntroVideo() {
  return useQuery({
    queryKey: creatorKeys.introVideo,
    queryFn: () => creatorService.getIntroVideo(),
  });
}

export function useUploadIntroVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file) => creatorService.uploadIntroVideo(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: creatorKeys.introVideo });
    },
  });
}

export function useCreatorPortfolio() {
  return useQuery({
    queryKey: creatorKeys.portfolio,
    queryFn: () => creatorService.getPortfolio(),
  });
}

export function useUploadPortfolio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (files) => creatorService.uploadPortfolio(files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: creatorKeys.portfolio });
    },
  });
}

export function useDeletePortfolioItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId) => creatorService.deletePortfolioItem(itemId),
    onSuccess: (_, itemId) => {
      queryClient.setQueryData(creatorKeys.portfolio, (old) =>
        old?.filter((item) => item.id !== itemId),
      );
    },
  });
}

export function useBlockInvites() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ blockStart, blockEnd }) =>
      creatorService.blockInvites(blockStart, blockEnd),
    onSuccess: (blockout) => {
      queryClient.setQueryData(creatorKeys.profile, (old) => ({
        ...old,
        blackouts: [blockout],
      }));
    },
  });
}

export function useClearBlockInvites() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blockoutId) => creatorService.clearBlockInvites(blockoutId),
    onSuccess: () => {
      queryClient.setQueryData(creatorKeys.profile, (old) => ({
        ...old,
        blackouts: [],
      }));
    },
  });
}
