"use client";

import UIDivisionList from "@/modules/human/division/components/UIDivisionList";
import { useFetchDivisions } from "@/modules/human/division/hooks";

export default function DivisionList() {
  const { divisions, loading } = useFetchDivisions();

  return (
    <UIDivisionList
      headerContent="Division List"
      divisions={divisions}
      isLoading={loading}
    />
  );
}
