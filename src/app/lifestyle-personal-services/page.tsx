import type { Metadata } from "next";
import BusinessCategoryPage from "@/components/BusinessCategoryPage";

export const metadata: Metadata = {
  title: "Lifestyle & Personal Services | Tapps Business Connect",
  description: "Find trusted beauty, salon, spa, photography, event planning, travel, childcare, and pet service professionals in Lake Tapps and East Pierce County.",
};

export default function LifestylePersonalServicesPage() {
  return (
    <BusinessCategoryPage
      categorySlug="lifestyle-personal-services"
      title="Lifestyle & Personal Services"
      description="Beauty, salons, spas, photographers, event planners, travel agents, childcare, pet services, and more — trusted lifestyle professionals in Lake Tapps and East Pierce County."
      metaTitle="Lifestyle & Personal Services"
    />
  );
}
