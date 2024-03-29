import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, Loader2, X } from "lucide-react";
import { z } from "zod";
import * as Dialog from "@radix-ui/react-dialog";

import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createTagSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Tag title must be at least 3 characters long." }),
});

type CreateTagFormData = z.infer<typeof createTagSchema>;

const getSlugFromString = (str: string) => {
  if (!str) return str;

  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]+/g, "")
    .replace(/[^a-z0-9]+/g, "-");
};

export const CreateTagForm: React.FC = () => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, watch, formState } =
    useForm<CreateTagFormData>({
      resolver: zodResolver(createTagSchema),
    });

  const slug = getSlugFromString(watch("title"));

  const { mutateAsync: createTagMutation } = useMutation({
    mutationFn: async ({ title }: CreateTagFormData) => {
      await fetch("http://localhost:3333/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          amountOfVideos: 0,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });

  const createTag = async ({ title }: CreateTagFormData) => {
    await createTagMutation({ title });
  };

  const SubmitButtonIcon = formState.isSubmitting ? (
    <Loader2 className="size-3 animate-spin" />
  ) : (
    <Check className="size-3" />
  );

  return (
    <form onSubmit={handleSubmit(createTag)} className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="title">
          Tag name
        </label>
        <input
          {...register("title")}
          className="border-zinc-580 rounded-lg px-3 py-2 bg-zinc-800/50 w-full"
          type="text"
          id="title"
        />

        {formState.errors.title && (
          <p className="text-sm text-red-400">
            {formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="slug">
          Slug
        </label>
        <input
          className="border-zinc-580 rounded-lg px-3 py-2 bg-zinc-800/50 w-full"
          type="text"
          id="slug"
          value={slug}
          readOnly
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Dialog.Close asChild>
          <Button>
            <X className="size-3" />
            Cancel
          </Button>
        </Dialog.Close>
        <Button
          className="bg-teal-400 text-teal-950"
          type="submit"
          disabled={formState.isSubmitting}
        >
          {SubmitButtonIcon}
          Save
        </Button>
      </div>
    </form>
  );
};
