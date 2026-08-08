import { ClerkProvider } from "@clerk/nextjs";

export function RootAuthLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
