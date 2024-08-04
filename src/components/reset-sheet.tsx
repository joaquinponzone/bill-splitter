import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ResetSheet({
  handleResetState,
}: {
  handleResetState: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" size={"lg"}>
          Reiniciar cuenta 🗑️
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Borrón y cuenta nueva</AlertDialogTitle>
          <Alert variant={"destructive"}>
            <AlertTitle className="text-neutral-100">Atenti ✋🏼</AlertTitle>
            <AlertDescription className="text-red-600">
              Esta acción no se puede deshacer.
            </AlertDescription>
          </Alert>
          <AlertDialogDescription>
            Confirma que querés reiniciar las cuentas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleResetState}>
            Reiniciar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
