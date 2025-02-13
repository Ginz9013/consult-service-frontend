import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/router";

const TokenExpiredAlert = () => {
  const router = useRouter();
  
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
            <AlertDialogAction onClick={() => router.push("/login")}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TokenExpiredAlert;