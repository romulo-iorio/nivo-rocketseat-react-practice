import { Check, X } from "lucide-react";
import { Button } from "./ui/button";

export const CreateTagForm: React.FC = () => {
  return (
    <form>
      <div>
        <label>Tag name</label>
        <input type="text" />
      </div>

      <div>
        <label>Slug</label>
        <input type="text" readOnly />
      </div>

      <div>
        <Button>
          <X className="size-3" />
          Cancel
        </Button>
        <Button type="submit">
          <Check className="size-3" />
          Save
        </Button>
      </div>
    </form>
  );
};
