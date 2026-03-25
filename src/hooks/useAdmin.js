import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminService from "../services/adminService";

export const adminKeys = {
  stats: ["admin", "stats"],
  submissions: ["admin", "submissions"],
  events: ["admin", "events"],
};

export function useAdminStats() {
  return useQuery({
    queryKey: adminKeys.stats,
    queryFn: () => adminService.getDashboardStats(),
  });
}

export function useAdminSubmissions() {
  return useQuery({
    queryKey: adminKeys.submissions,
    queryFn: () => adminService.getSubmissions(),
  });
}

export function useReviewSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ submissionId, decision, notes }) =>
      adminService.reviewSubmission(submissionId, decision, notes),
    onSuccess: (updated, { submissionId }) => {
      queryClient.setQueryData(adminKeys.submissions, (old) =>
        old?.map((s) => (s.id === submissionId ? { ...s, ...updated } : s)),
      );
    },
  });
}

export function useAdminEvents() {
  return useQuery({
    queryKey: adminKeys.events,
    queryFn: () => adminService.getEvents(),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventData) => adminService.createEvent(eventData),
    onSuccess: (created) => {
      queryClient.setQueryData(adminKeys.events, (old) => [
        created,
        ...(old || []),
      ]);
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, eventData }) =>
      adminService.updateEvent(eventId, eventData),
    onSuccess: (updated, { eventId }) => {
      queryClient.setQueryData(adminKeys.events, (old) =>
        old?.map((ev) => (ev.id === eventId ? { ...ev, ...updated } : ev)),
      );
    },
  });
}

export function usePublishEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId) => adminService.publishEvent(eventId),
    onSuccess: (updated, eventId) => {
      queryClient.setQueryData(adminKeys.events, (old) =>
        old?.map((ev) => (ev.id === eventId ? { ...ev, ...updated } : ev)),
      );
    },
  });
}

export function useUnpublishEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId) => adminService.unpublishEvent(eventId),
    onSuccess: (updated, eventId) => {
      queryClient.setQueryData(adminKeys.events, (old) =>
        old?.map((ev) => (ev.id === eventId ? { ...ev, ...updated } : ev)),
      );
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId) => adminService.deleteEvent(eventId),
    onSuccess: (_, eventId) => {
      queryClient.setQueryData(adminKeys.events, (old) =>
        old?.filter((ev) => ev.id !== eventId),
      );
    },
  });
}
