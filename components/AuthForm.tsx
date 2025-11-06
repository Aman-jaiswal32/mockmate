/* "use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "@/Firebase/client";
import { signIn, signUp } from "@/lib/action/auth.action";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(6),
    });
};

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                await sendEmailVerification(userCredentials.user);
                toast.success("Verification email sent. Please check your inbox.");

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                });

                if (!result?.success) {
                    toast.error(result?.message);
                    return;
                }

                toast.success("Account created successfully. Please verify your email.");
                router.push("/sign-in");
            } else {
                const { email, password } = values;

                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                if (!userCredential.user.emailVerified) {
                    toast.error("Please verify your email before signing in.");
                    await sendEmailVerification(userCredential.user);
                    toast.info("Verification email resent.");
                    await auth.signOut();
                    return;
                }

                const idToken = await userCredential.user.getIdToken();
                await signIn({ email, idToken });

                toast.success("Signed in successfully.");
                router.push("/");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(`Error: ${error.message}`);
        }
    }

    const handleForgotPassword = async () => {
        const email = form.getValues("email");
        if (!email) {
            toast.error("Please enter your email first.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent. Check your inbox.");
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to send reset email.");
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const idToken = await user.getIdToken();
            const isNewUser = result._tokenResponse?.isNewUser;

            if (isNewUser) {
                await signUp({
                    uid: user.uid,
                    name: user.displayName || "User",
                    email: user.email!,
                    password: "google",
                    image: user.photoURL || "",
                });
            } else {
                await signIn({ email: user.email!, idToken });
            }

            toast.success("Signed in with Google successfully!");
            router.push("/");
        } catch (error: any) {
            console.error(error);
            toast.error("Google sign-in failed. Please try again.");
        }
    };

    const handleGithubSignIn = async () => {
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const idToken = await user.getIdToken();
            const isNewUser = result._tokenResponse?.isNewUser;

            if (isNewUser) {
                await signUp({
                    uid: user.uid,
                    name: user.displayName || "GitHub User",
                    email: user.email || `${user.uid}@github.com`, // GitHub may not provide email
                    password: "github",
                    image: user.photoURL || "",
                });
            } else {
                await signIn({ email: user.email || `${user.uid}@github.com`, idToken });
            }

            toast.success("Signed in with GitHub successfully!");
            router.push("/");
        } catch (error: any) {
            console.error(error);
            toast.error("GitHub sign-in failed. Please try again.");
        }
    };

    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-8 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">MockMate</h2>
                </div>

                <h4>
                    <b>Your AI-powered companion for mastering interviews.</b>
                </h4>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-5 form"
                    >
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your Name"
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your email address"
                            type="email"
                        />

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                            />

                            {isSignIn && (
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-sm text-user-primary hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            )}
                        </div>

                        <Button className="btn" type="submit">
                            {isSignIn ? "Sign In" : "Create an Account"}
                        </Button>
                    </form>
                </Form>

                <div className="flex flex-col items-center gap-2 mt-2">
                    <p className="text-sm text-white">or</p>

                    <Button
                        onClick={handleGoogleSignIn}
                        variant="outline"
                        className="flex items-center gap-2 w-full justify-center"
                    >
                        <Image
                            src="/google-icon.svg"
                            alt="Google Icon"
                            width={20}
                            height={20}
                        />
                        Continue with Google
                    </Button>

                    <Button
                        onClick={handleGithubSignIn}
                        variant="outline"
                        className="flex items-center gap-2 w-full mt-1 justify-center"
                    >
                        <Image
                            src="/github-icon.png"
                            alt="GitHub Icon"
                            width={20}
                            height={20}
                        />
                        Continue with GitHub
                    </Button>
                </div>

                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link
                        href={!isSignIn ? "/sign-in" : "/sign-up"}
                        className="font-bold text-user-primary ml-1"
                    >
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm; */

/*"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "@/Firebase/client";
import { signIn, signUp } from "@/lib/action/auth.action";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(6),
    });
};

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                await sendEmailVerification(userCredentials.user);
                toast.success("Verification email sent. Please check your inbox.");

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                });

                if (!result?.success) {
                    toast.error(result?.message);
                    return;
                }

                toast.success("Account created successfully. Please verify your email.");
                router.push("/sign-in");
            } else {
                const { email, password } = values;

                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                if (!userCredential.user.emailVerified) {
                    toast.error("Please verify your email before signing in.");
                    await sendEmailVerification(userCredential.user);
                    toast.info("Verification email resent.");
                    await auth.signOut();
                    return;
                }

                const idToken = await userCredential.user.getIdToken();
                await signIn({ email, idToken });

                toast.success("Signed in successfully.");
                router.push("/");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(`Error: ${error.message}`);
        }
    }

    const handleForgotPassword = async () => {
        const email = form.getValues("email");
        if (!email) {
            toast.error("Please enter your email first.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent. Check your inbox.");
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to send reset email.");
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const idToken = await user.getIdToken();
            const isNewUser = result._tokenResponse?.isNewUser;

            if (isNewUser) {
                await signUp({
                    uid: user.uid,
                    name: user.displayName || "User",
                    email: user.email!,
                    password: "google",
                    image: user.photoURL || "",
                });
            } else {
                await signIn({ email: user.email!, idToken });
            }

            toast.success("Signed in with Google successfully!");
            router.push("/");
        } catch (error: any) {
            console.error(error);
            toast.error("Google sign-in failed. Please try again.");
        }
    };

    const handleGithubSignIn = async () => {
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const idToken = await user.getIdToken();
            const isNewUser = result._tokenResponse?.isNewUser;

            if (isNewUser) {
                await signUp({
                    uid: user.uid,
                    name: user.displayName || "GitHub User",
                    email: user.email || `${user.uid}@github.com`,
                    password: "github",
                    image: user.photoURL || "",
                });
            } else {
                await signIn({ email: user.email || `${user.uid}@github.com`, idToken });
            }

            toast.success("Signed in with GitHub successfully!");
            router.push("/");
        } catch (error: any) {
            console.error(error);
            toast.error("GitHub sign-in failed. Please try again.");
        }
    };

    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-8 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">MockMate</h2>
                </div>

                <h4>
                    <b>Your AI-powered companion for mastering interviews.</b>
                </h4>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-5 form"
                    >
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your Name"
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your email address"
                            type="email"
                        />

                        <div className="space-y-2 relative">
                            <FormField
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[38px] text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>

                            {isSignIn && (
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-sm text-user-primary hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            )}
                        </div>

                        <Button className="btn" type="submit">
                            {isSignIn ? "Sign In" : "Create an Account"}
                        </Button>
                    </form>
                </Form>

                <div className="flex flex-col items-center gap-2 mt-2">
                    <p className="text-sm text-white">or</p>

                    <Button
                        onClick={handleGoogleSignIn}
                        variant="outline"
                        className="flex items-center gap-2 w-full justify-center"
                    >
                        <Image
                            src="/google-icon.svg"
                            alt="Google Icon"
                            width={20}
                            height={20}
                        />
                        Continue with Google
                    </Button>

                    <Button
                        onClick={handleGithubSignIn}
                        variant="outline"
                        className="flex items-center gap-2 w-full mt-1 justify-center"
                    >
                        <Image
                            src="/github-icon.png"
                            alt="GitHub Icon"
                            width={20}
                            height={20}
                        />
                        Continue with GitHub
                    </Button>
                </div>

                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link
                        href={!isSignIn ? "/sign-in" : "/sign-up"}
                        className="font-bold text-user-primary ml-1"
                    >
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm; */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "@/Firebase/client";
import { signIn, signUp } from "@/lib/action/auth.action";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(6),
    });
};

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                await sendEmailVerification(userCredentials.user);
                toast.success("Verification email sent. Please check your inbox.");

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                });

                if (!result?.success) {
                    toast.error(result?.message);
                    return;
                }

                toast.success("Account created successfully. Please verify your email.");
                router.push("/sign-in");
            } else {
                const { email, password } = values;

                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                if (!userCredential.user.emailVerified) {
                    toast.error("Please verify your email before signing in.");
                    await sendEmailVerification(userCredential.user);
                    toast.info("Verification email resent.");
                    await auth.signOut();
                    return;
                }

                const idToken = await userCredential.user.getIdToken();
                await signIn({ email, idToken });

                toast.success("Signed in successfully.");
                router.push("/home");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(`Error: ${error.message}`);
        }
    }

    const handleForgotPassword = async () => {
        const email = form.getValues("email");
        if (!email) {
            toast.error("Please enter your email first.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent. Check your inbox.");
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to send reset email.");
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const idToken = await user.getIdToken();
            const isNewUser = result._tokenResponse?.isNewUser;

            if (isNewUser) {
                await signUp({
                    uid: user.uid,
                    name: user.displayName || "User",
                    email: user.email!,
                    password: "google",
                    image: user.photoURL || "",
                });
            } else {
                await signIn({ email: user.email!, idToken });
            }

            toast.success("Signed in with Google successfully!");
            router.push("/home");
        } catch (error: any) {
            console.error(error);
            toast.error("Google sign-in failed. Please try again.");
        }
    };

    const handleGithubSignIn = async () => {
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const idToken = await user.getIdToken();
            const isNewUser = result._tokenResponse?.isNewUser;

            if (isNewUser) {
                await signUp({
                    uid: user.uid,
                    name: user.displayName || "GitHub User",
                    email: user.email || `${user.uid}@github.com`,
                    password: "github",
                    image: user.photoURL || "",
                });
            } else {
                await signIn({ email: user.email || `${user.uid}@github.com`, idToken });
            }

            toast.success("Signed in with GitHub successfully!");
            router.push("/home");
        } catch (error: any) {
            console.error(error);
            toast.error("GitHub sign-in failed. Please try again.");
        }
    };

    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-8 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">MockMate</h2>
                </div>

                <h4>
                    <b>Your AI-powered companion for mastering interviews.</b>
                </h4>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-5 form"
                    >
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your Name"
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your email address"
                            type="email"
                        />

                        <div className="space-y-2 relative">
                            <FormField
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[38px] text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>

                            {isSignIn && (
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-sm text-user-primary hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            )}
                        </div>

                        <Button className="btn" type="submit">
                            {isSignIn ? "Sign In" : "Create an Account"}
                        </Button>
                    </form>
                </Form>

                <div className="flex flex-col items-center gap-2 mt-2">
                    <p className="text-sm text-white">or</p>

                    <Button
                        onClick={handleGoogleSignIn}
                        variant="outline"
                        className="flex items-center gap-2 w-full justify-center"
                    >
                        <Image
                            src="/google-icon.svg"
                            alt="Google Icon"
                            width={20}
                            height={20}
                        />
                        Continue with Google
                    </Button>

                    <Button
                        onClick={handleGithubSignIn}
                        variant="outline"
                        className="flex items-center gap-2 w-full mt-1 justify-center"
                    >
                        <Image
                            src="/github-icon.png"
                            alt="GitHub Icon"
                            width={20}
                            height={20}
                        />
                        Continue with GitHub
                    </Button>
                </div>

                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link
                        href={!isSignIn ? "/sign-in" : "/sign-up"}
                        className="font-bold text-user-primary ml-1"
                    >
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;