"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationApi } from "@/lib/api/applications";
import { ApplicationStatus } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

type Props = {
  applicationId: string;
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  status: ApplicationStatus;
  remarks?: string;
};

export const UpdateStatusModal = ({ applicationId, isOpen, onClose }: Props): JSX.Element => {
  const { register, handleSubmit } = useForm<FormValues>({ defaultValues: { status: "pending" } });
  const queryClient = useQueryClient();
  const { pushToast } = useToast();

  const mutation = useMutation({
    mutationFn: (payload: FormValues) => applicationApi.updateStatus(applicationId, payload),
    onSuccess: () => {
      pushToast({ type: "success", message: "Application status updated" });
      void queryClient.invalidateQueries();
      onClose();
    },
    onError: (error: { userMessage?: string }) => {
      pushToast({ type: "error", message: error.userMessage ?? "Failed to update status" });
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Application Status">
      <form className="space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <Select label="Status" {...register("status")}>
          <option value="pending">Pending</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
          <option value="hired">Hired</option>
        </Select>
        <Textarea label="Remarks" placeholder="Optional remarks" {...register("remarks")} />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button isLoading={mutation.isPending} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};
