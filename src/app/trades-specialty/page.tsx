import type { Metadata } from "next";
import BusinessCategoryPage from "@/components/BusinessCategoryPage";

export const metadata: Metadata = {
  title: "Trades & Specialty | Tapps Business Connect",
  description: "Find trusted contractors, electricians, plumbers, HVAC technicians, roofers, painters, and specialty trade professionals in Lake Tapps and East Pierce County.",
};

export default function TradesSpecialtyPage() {
  return (
    <BusinessCategoryPage
      categorySlug="trades-specialty"
      title="Trades & Specialty"
      description="Contractors, electricians, plumbers, HVAC, automotive, roofers, painters, remodelers, and more — skilled trade professionals serving Lake Tapps and East Pierce County."
      metaTitle="Trades & Specialty"
    />
  );
}
