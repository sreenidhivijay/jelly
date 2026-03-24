import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import brandService from "../services/brandService";
import { Brand } from "../models/brand";

export const brandKeys = {
  profile: ["brand", "profile"] as const,
};

export function useBrandProfile() {
  return useQuery<Brand>({
    queryKey: brandKeys.profile,
    queryFn: () => brandService.getProfile(),
  });
}

export function useUpdateBrandProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (fields: Partial<Brand>) => brandService.updateProfile(fields),
    onSuccess: (data) => {
      queryClient.setQueryData(brandKeys.profile, data);
    },
  });
}

export function useUploadBrandPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => brandService.uploadProfilePhoto(file),
    onSuccess: (data) => {
      queryClient.setQueryData<Brand>(brandKeys.profile, (old) =>
        old ? { ...old, profile_image_url: data.profile_image_url } : old,
      );
    },
  });
}
