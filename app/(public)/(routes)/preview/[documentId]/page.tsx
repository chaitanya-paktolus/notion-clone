"use client";
import Cover from "@/components/cover";
import dynamic from "next/dynamic";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import React, { useMemo } from "react";

interface PreviewPageProps {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
}
const PreviewPage = ({ params }: PreviewPageProps) => {
  const unwrappedParams = React.use(params);
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const updateContent = useMutation(api.documents.update);
  const document = useQuery(api.documents.getById, {
    documentId: unwrappedParams.documentId,
  });

  const updateDocumentContent = (content: string) => {
    updateContent({
      id: unwrappedParams.documentId,
      content,
    });
  };
  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }
  if (document === null) {
    return <div>Document not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} preview />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} preview />
        <Editor
          onChange={updateDocumentContent}
          initialContent={document.content}
          editable={false}
        />
      </div>
    </div>
  );
};

export default PreviewPage;
