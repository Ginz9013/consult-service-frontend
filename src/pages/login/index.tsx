import useSWRMutation from "swr/mutation";
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

import { login } from "@/lib/auth/api";
 
const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string()
    .min(6, "Must contain at least 6 characters.")
    .max(20, "Must contain at most 20 characters.")
});

const Login:React.FC = () => {

  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // const { data: orderList, isMutating, trigger } = useSWRMutation("orderListKey", fetcher);
 
  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const res = await login(values);
    console.log(res);
  }

  return (
    <main className="flex flex-col items-center justify-center mt-48">
      <h2 className="text-2xl mb-12">Login</h2>

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

    </main>
  );
};

export default Login;