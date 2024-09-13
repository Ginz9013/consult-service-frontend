import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function Home() {

  const router = useRouter();


  const toLoginPage = () => router.push("/login");

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-12">Home</h1>
      <Button variant="default" onClick={toLoginPage}>shadcn/ui</Button>
    </main>
  );
}
