import type { Metadata } from "next";
import BusinessCategoryPage from "@/components/BusinessCategoryPage";

export const metadata: Metadata = {
  title: "Food & Hospitality | Tapps Business Connect",
  description: "Find trusted restaurants, catering, coffee shops, bakeries, breweries, venues, and lodging in the Lake Tapps and East Pierce County area.",
};

export default function FoodHospitalityPage() {
  return (
    <BusinessCategoryPage
      categorySlug="food-hospitality"
      title="Food & Hospitality"
      description="Restaurants, catering, coffee shops, bakeries, breweries, venues, lodging, and more — this category is open for new members in Lake Tapps and East Pierce County."
      metaTitle="Food & Hospitality"
    />
  );
}
