import type { Metadata } from "next";
import BusinessCategoryPage from "@/components/BusinessCategoryPage";

export const metadata: Metadata = {
  title: "Home Services | Tapps Business Connect",
  description: "Find trusted real estate agents, mortgage lenders, inspectors, cleaners, landscapers, staging professionals, and more in Lake Tapps and East Pierce County.",
};

export default function HomeServicesPage() {
  return (
    <BusinessCategoryPage
      categorySlug="home-services"
      title="Home Services"
      description="Real estate agents, mortgage lenders, title, landscapers, inspectors, cleaners, staging, junk removal, and more — trusted home service professionals in Lake Tapps and East Pierce County."
      metaTitle="Home Services"
    />
  );
}
