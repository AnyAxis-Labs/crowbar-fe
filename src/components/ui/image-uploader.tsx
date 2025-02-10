import { useState } from "react";
import { useDropzone } from "react-dropzone";
import type {
  DropzoneProps as _DropzoneProps,
  DropzoneState as _DropzoneState,
} from "react-dropzone";
import { get } from "es-toolkit/compat";

import { cn, formatImageUrl } from "@/lib/utils";
import { IconGallaryExport } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useFileUploadControllerUploadSingle } from "@/services/queries";

export interface DropzoneState extends _DropzoneState {}

export interface DropzoneProps extends Omit<_DropzoneProps, "children"> {
  containerClassName?: string;
  dropZoneClassName?: string;
  children?: (dropzone: DropzoneState) => React.ReactNode;
  showErrorMessage?: boolean;
  onUploadSuccess?: (file: string) => void;
  onUploadError?: (error: string) => void;
  buttonText: string;
}

export const ImageUploader = ({
  containerClassName,
  dropZoneClassName,
  children,
  showErrorMessage = true,
  buttonText,
  onUploadSuccess,
  onUploadError,
  ...props
}: DropzoneProps) => {
  const uploader = useFileUploadControllerUploadSingle({
    mutation: {
      onSuccess: (data) => {
        const fileUrl = get(data, ["data", "fileName"], "");
        const formattedUrl = formatImageUrl(fileUrl);
        onUploadSuccess?.(formattedUrl);
      },
      onError: (err) => {
        onUploadError?.(err.message);
        setErrorMessage("Error uploading file, please try again later.");
      },
    },
  });

  // State:
  const [, setFile] = useState<File>();
  const [errorMessage, setErrorMessage] = useState<string>();

  // Constants:
  const dropzone = useDropzone({
    ...props,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    async onDrop(acceptedFiles, fileRejections, event) {
      if (props.onDrop) props.onDrop(acceptedFiles, fileRejections, event);
      else {
        setFile(acceptedFiles[0]);
        if (fileRejections.length > 0) {
          let _errorMessage = `Could not upload ${fileRejections[0].file.name}`;
          if (fileRejections.length > 1)
            _errorMessage = `${_errorMessage}, and ${fileRejections.length - 1} other files.`;
          setErrorMessage(_errorMessage);
        } else {
          setErrorMessage("");
          const blob = new Blob([acceptedFiles[0]], { type: acceptedFiles[0].type });
          await uploader.mutateAsync({ data: { file: blob } });
        }
      }
    },
  });

  return (
    <div className={cn("rounded-[16px] p-1 bg-[#262626]", containerClassName)}>
      <div
        {...dropzone.getRootProps()}
        className={cn(
          "flex justify-center items-center w-full h-[192px] border-dashed border-[1px] border-white/20 rounded-[12px] hover:bg-accent hover:text-accent-foreground transition-all select-none cursor-pointer",
          dropZoneClassName,
        )}
      >
        <input multiple={false} accept="image/*" {...dropzone.getInputProps()} />
        {children ? (
          children(dropzone)
        ) : dropzone.isDragAccept ? (
          <div className="text-sm font-medium">Drop your files here!</div>
        ) : (
          <div className="flex items-center flex-col justify-end h-full">
            <div className="bg-primary/20 rounded-full p-[10px]">
              <div className="p-2 bg-primary rounded-full">
                <IconGallaryExport className="w-4 h-4 text-primary-dark" />
              </div>
            </div>

            {props.maxSize && (
              <div className="text-sm mt-2 text-[#666]">
                JPG, PNG. Max {(props.maxSize / (1024 * 1024)).toFixed(0)} MB.
              </div>
            )}

            <Button
              className="mb-4 mt-8 rounded-full border-primary text-primary text-sm h-9 bg-transparent py-2 px-4 font-medium"
              variant="outline"
              loading={uploader.isPending}
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
      {errorMessage && <span className="text-xs text-red-600 mt-3">{errorMessage}</span>}
    </div>
  );
};
