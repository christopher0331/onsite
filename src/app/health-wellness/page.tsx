import type { Metadata } from "next";
import BusinessCategoryPage from "@/components/BusinessCategoryPage";

export const metadata: Metadata = {
  title: "Health & Wellness | Tapps Business Connect",
  description: "Find trusted medical, dental, chiropractic, physical therapy, mental health, fitness, and wellness professionals in the Lake Tapps and East Pierce County area.",
};

export default function HealthWellnessPage() {
  return (
    <BusinessCategoryPage
      categorySlug="health-wellness"
      title="Health & Wellness"
      description="Medical, dental, chiropractic, physical therapy, mental health, senior care, nutrition, fitness, massage, and more — this category is open for new members in Lake Tapps and East Pierce County."
      metaTitle="Health & Wellness"
    />
  );
}
