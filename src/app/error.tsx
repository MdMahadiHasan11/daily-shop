"use client";

import { AlertCircle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const copyErrorMessage = () => {
    navigator.clipboard.writeText(error.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="size-6" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Oops! Something went wrong
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            We encountered an unexpected error. Don&apos;t worry, it&apos;s not
            your fault.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Development Error Details */}
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-destructive font-mono break-all leading-relaxed">
                  {error.message}
                </p>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={copyErrorMessage}
                  className="shrink-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              {error.digest && (
                <p className="text-xs text-muted-foreground font-mono">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <Button onClick={reset} className="gap-2">
              <RefreshCw className="size-4" />
              Try Again
            </Button>

            <Link href="/">
              <Button variant="outline" className="gap-2">
                <Home className="size-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            If this problem persists, contact support.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
