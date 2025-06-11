// import React from "react";
// import { useForm, Head } from "@inertiajs/react";

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// export default function LoginPage() {
//   const { data, setData, post, processing, errors } = useForm({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     post("/login");
//   };

//   return (
//     <>
//       <Head title="Login" />

//       <div className="w-full h-screen flex items-center justify-center bg-gray-100">
//         <Card className="w-[350px]">
//           <CardHeader>
//             <CardTitle className="text-2xl">Login</CardTitle>
//             <CardDescription>
//               Enter your email and password to log in
//             </CardDescription>
//           </CardHeader>
//           <form onSubmit={handleSubmit}>
//             <CardContent className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   name="email"
//                   placeholder="you@example.com"
//                   value={data.email}
//                   onChange={(e) => setData("email", e.target.value)}
//                 />
//                 {errors.email && (
//                   <p className="text-sm text-red-500">{errors.email}</p>
//                 )}
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   name="password"
//                   placeholder="••••••••"
//                   value={data.password}
//                   onChange={(e) => setData("password", e.target.value)}
//                 />
//                 {errors.password && (
//                   <p className="text-sm text-red-500">{errors.password}</p>
//                 )}
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 disabled={processing}
//                 type="submit"
//                 className="w-full"
//               >
//                 {processing ? "Logging in..." : "Login"}
//               </Button>
//             </CardFooter>
//           </form>
//         </Card>
//       </div>
//     </>
//   );
// }

import React from "react";
import { useForm, Head } from "@inertiajs/react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <>
      <Head title="Login" />

      <div className="w-full h-screen flex items-center justify-center bg-white">
        <Card className="w-[380px] shadow-lg rounded-2xl border-none bg-[#d6a89e]">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-sm text-white/90">
              Enter your email and password to log in.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="bg-white border border-white placeholder:text-[#7a6e5f]"
                />
                {errors.email && (
                  <p className="text-sm text-white">{errors.email}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  className="bg-white border border-white placeholder:text-[#7a6e5f]"
                />
                {errors.password && (
                  <p className="text-sm text-white">{errors.password}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={processing}
                type="submit"
                className="w-full bg-[#7a6e5f] hover:bg-[#809080] text-white"
              >
                {processing ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
