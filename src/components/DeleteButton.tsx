import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QueryClient, QueryKey, useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteButtonProps {
  item: string;
  id: string;
  queryKey: QueryKey;
  deleteFn: (id: string) => Promise<void>;
  onDelete?: (id: string) => void;
}

export function DeleteButton({
  item,
  id,
  queryKey,
  deleteFn,
  onDelete,
}: DeleteButtonProps) {
  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(`${item} delete successfull!`);
      onDelete?.(id);
    },
    onError: (error) => {
      toast.error(`Feiled to delete ${item}`);
      console.error(`Failed to delete ${item}:`, error);
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="destructive"
          className="bg-secondary text-secondary-foreground hover:text-white"
          disabled={mutation.isPending}
        >
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {item.toLowerCase()}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {item.toLowerCase()}?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" disabled={mutation.isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
