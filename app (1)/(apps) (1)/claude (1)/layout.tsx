import { DashboardLayout } from "@/components/(apps)/dashboard/layout";
import { toolConfig } from "@/app/(apps)/claude/toolConfig";

export const metadata = {
  title: toolConfig.metadata.title,
  description: toolConfig.metadata.description,
  openGraph: {
    images: [toolConfig.metadata.og_image],
  },
  alternates: {
    canonical: toolConfig.metadata.canonical,
  },
};

export default function WithGreetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout toolConfig={toolConfig} showGreeting={true}>
      {children}
    </DashboardLayout>
  );
}
