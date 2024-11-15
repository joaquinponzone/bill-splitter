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
      <AlertDialogTrigger asChild className="w-3/4 md:w-full">
        <Button variant="secondary" size={"lg"} className="h-12">
          Reiniciar cuenta 🗑️
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl py-6" >
            Borrón y cuenta nueva
          </AlertDialogTitle>
          <Alert variant={"destructive"} className="flex flex-col items-start px-8 gap-2">
            <AlertTitle className="text-neutral-100">Atenti ✋🏼</AlertTitle>
            <AlertDescription className="text-red-600">
              Esta acción no se puede deshacer.
            </AlertDescription>
          </Alert>
          {/* <AlertDialogDescription>
            Confirma que querés reiniciar las cuentas.
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-12">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="h-12" onClick={handleResetState}>
            Reiniciar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
