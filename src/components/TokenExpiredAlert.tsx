import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { clearAllStore } from "@/store/clear";
import { useRouter } from "next/router";

const TokenExpiredAlert = () => {
  const router = useRouter();

  const handlerLogout = async () => {
    clearAllStore(); 
    await router.replace("/login");
  }
  
  return (
    <div className="h-full">
      <AlertDialog open={true}>
        <AlertDialogContent className="w-4/5">
          <AlertDialogHeader>
            <AlertDialogTitle>Please login again!</AlertDialogTitle>
            <AlertDialogDescription>
              Your authentication has expired.
            </AlertDialogDescription>
            <br />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handlerLogout}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TokenExpiredAlert;