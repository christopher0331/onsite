import type { Metadata } from "next";
import BusinessCategoryPage from "@/components/BusinessCategoryPage";

export const metadata: Metadata = {
  title: "Finance & Professional | Tapps Business Connect",
  description: "Find trusted accountants, financial advisors, insurance agents, attorneys, and business consultants in the Lake Tapps and East Pierce County area.",
};

export default function FinanceProfessionalPage() {
  return (
    <BusinessCategoryPage
      categorySlug="finance-professional"
      title="Finance & Professional"
      description="Accountants, bookkeepers, financial advisors, insurance agents, attorneys, consultants, coaching, marketing, IT, and more — trusted professionals serving Lake Tapps and East Pierce County."
      metaTitle="Finance & Professional"
    />
  );
}
