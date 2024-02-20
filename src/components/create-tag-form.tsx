import { Check, X } from "lucide-react";
import { Button } from "./ui/button";

export const CreateTagForm: React.FC = () => {
  return (
    <form className="w-full space-y-6">
      <div className="space-2">
        <label className="text-sm font-medium" htmlFor="name">
          Tag name
        </label>
        <input
          className="border-zinc-580 rounded-lg px-3 py-2"
          type="text"
          id="name"
        />
      </div>

      <div className="space-2">
        <label className="text-sm font-medium" htmlFor="slug">
          Slug
        </label>
        <input
          className="border-zinc-580 rounded-lg px-3 py-2"
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
