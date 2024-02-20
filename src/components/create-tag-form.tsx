import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, X } from "lucide-react";
import { z } from "zod";

import { Button } from "./ui/button";

const createTagSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Tag name must be at least 3 characters long." }),
  slug: z.string(),
});

export const CreateTagForm: React.FC = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(createTagSchema),
  });

  const createTag = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(createTag)} className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="name">
          Tag name
        </label>
        <input
          {...register("name")}
          className="border-zinc-580 rounded-lg px-3 py-2 bg-zinc-800/50 w-full"
          type="text"
          id="name"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="slug">
          Slug
        </label>
        <input
          {...register("slug")}
          className="border-zinc-580 rounded-lg px-3 py-2 bg-zinc-800/50 w-full"
          type="text"
          id="slug"
          readOnly
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button>
          <X className="size-3" />
          Cancel
        </Button>
        <Button type="submit" className="bg-teal-400 text-teal-950">
          <Check className="size-3" />
          Save
        </Button>
      </div>
    </form>
  );
};
