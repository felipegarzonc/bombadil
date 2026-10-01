import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Landing } from "@/components/landing";
import { getViewer } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Bombadil · Longevidad sin humo" },
  description: "Tus exámenes, tu reloj y hábitos pequeños que suben de nivel: un plan diario, basado en evidencia, para vivir más y mejor.",
  robots: { index: true, follow: true },
};

export default async function Home() {
  const v = await getViewer();
  if (v) {
    if (v.isAdmin) redirect("/admin");
    if (!v.participant) redirect("/sin-acceso");
    if (v.participant.status === "invited") redirect("/onboarding");
    redirect("/app");
  }
  return <Landing />;
}
