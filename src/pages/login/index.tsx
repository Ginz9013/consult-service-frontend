import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

import { store } from "@/redux/index";
import { storeAccessToken } from "@/redux/dispatcher";
import { login } from "@/lib/auth/api";
import { useState } from 'react';
 
const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string()
    .min(6, "Must contain at least 6 characters.")
    .max(20, "Must contain at most 20 characters.")
});


const Login: React.FC = () => {
  
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  // Define a submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const res = await login(values);
    
    if (res.status !== 200) {
      toast({
        variant: "destructive",
        description: res.message,
      });
      return;
    };

    const token = res.data.access_token;

    store.dispatch(storeAccessToken(token));
    router.push("/dashboard");
  }
  

  return (
    <main className="flex flex-col items-center justify-center mt-48">
      <h2 className="text-2xl mb-12">Vincent CS.</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-12 w-3/4">

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </Form>

      {/* Toaster */}
      <Toaster />
    </main>
  );
};

export default Login;