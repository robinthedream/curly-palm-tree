import { DashboardLayout } from "@/components/(apps)/dashboard/layout";
import { toolConfig } from "./toolConfig";

export const metadata = {
  title: toolConfig.metadata.title,
  description: toolConfig.metadata.description,
  openGraph: {
    images: [toolConfig.metadata.og_image],
  },
  alternates: {
    canonical: `${toolConfig.metadata.canonical}/app`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout toolConfig={toolConfig}>{children}</DashboardLayout>;
}
