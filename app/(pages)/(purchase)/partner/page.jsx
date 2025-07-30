"use client";

import UIPartnerList from "@/modules/purchase/partner/components/UIPartnerList";
import { useFetchPartners } from "@/modules/purchase/partner/hooks";

export default function PartnerList() {
  const { partners, loading } = useFetchPartners();

  return (
    <UIPartnerList
      headerContent="Partner List"
      partners={partners}
      isLoading={loading}
    />
  );
}
