import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {

  const [title, setTitle] = useState<string>("Home");

  return (
    <main>
      <h1>{title}</h1>
      <Button variant="default">shadcn/ui</Button>
    </main>
  );
}
