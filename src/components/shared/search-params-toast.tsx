"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface ToastConfig {
  paramKey: string;
  expectedValue?: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

interface SearchParamsToastProps {
  configs: ToastConfig[];
}

export default function SearchParamsToast({ configs }: SearchParamsToastProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let paramMatched = false;
    const newUrl = new URL(window.location.href);

    configs.forEach(
      ({ paramKey, expectedValue = "true", message, type = "success" }) => {
        const val = searchParams.get(paramKey);

        if (val === expectedValue || (val !== null && expectedValue === "*")) {
          toast[type](message);
          newUrl.searchParams.delete(paramKey);
          paramMatched = true;
        }
      },
    );

    if (paramMatched) {
      router.replace(newUrl.toString(), { scroll: false });
    }
  }, [searchParams, router, configs]);

  return null;
}
