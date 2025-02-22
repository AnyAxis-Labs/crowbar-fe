import { useRef } from "react";
import { toast } from "sonner";
import { DateTime } from "luxon";
import { useAccount } from "wagmi";
import { get } from "es-toolkit/compat";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  IconCamera,
  IconChat,
  IconClose,
  IconGradientBox,
  IconMessage,
  IconSend,
} from "@/components/icons";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  useCommentControllerCreate,
  useCommentControllerGetPagination,
  useFileUploadControllerUploadSingle,
} from "@/services/queries";
import type { CommentResponse } from "@/services/models";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formatImageUrl, shortAddress } from "@/lib/utils";
import { ToastCard } from "@/components/shared/toast-card";
import ImageWithFallback from "@/components/shared/image-with-fallback";
import { UserAvatar } from "@/components/shared/user-avatar";
import { createRules, rules } from "@/lib/form";

interface ChatCardProps {
  hash: string;
}

interface ChatFormSchema {
  content: string;
  image: string;
}

export const ChatCard = ({ hash }: ChatCardProps) => {
  const form = useForm<ChatFormSchema>({
    defaultValues: {
      content: "",
    },
    mode: "all",
  });

  const image = form.watch("image");

  const { address } = useAccount();
  const { data: commentsResponse, refetch: refetchComments } =
    useCommentControllerGetPagination(
      {
        tokenAddress: hash,
      },
      {
        query: {
          refetchInterval: 60 * 1000, // 1 minute
        },
      }
    );
  const createCommentMutation = useCommentControllerCreate();

  const comments = get(commentsResponse, "data.data", []) as CommentResponse[];
  const sortedComments = comments.sort((a, b) =>
    b.created_at.localeCompare(a.created_at)
  );

  const uploader = useFileUploadControllerUploadSingle({
    mutation: {
      onSuccess: (data) => {
        const fileUrl = get(data, ["data", "fileName"], "");
        const formattedUrl = formatImageUrl(fileUrl);
        form.setValue("image", formattedUrl);
      },
      onError: () => {
        toast.custom((t) => (
          <ToastCard
            title="Upload failed"
            toastId={t}
            variant="error"
            description="Please try again later."
          />
        ));
      },
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const blob = new Blob([file], { type: file.type });
        uploader.mutate({ data: { file: blob } });
      } else {
        toast.custom((t) => (
          <ToastCard
            title="Invalid file type"
            toastId={t}
            variant="error"
            description="Please select an image file."
          />
        ));
      }
    }
  };

  const handleRemoveImage = () => {
    form.setValue("image", "");
  };

  const handleCreateComment = async (data: ChatFormSchema) => {
    if (!address) return;

    try {
      await createCommentMutation.mutateAsync({
        data: {
          content: data.content,
          tokenAddress: hash,
          image: data.image,
        },
      });
      refetchComments();
      form.reset({ content: "", image: "" });
    } catch (error) {
      toast.custom((t) => (
        <ToastCard
          title="Failed to post comment"
          toastId={t}
          variant="error"
          description="Please try again later."
        />
      ));
    }
  };

  return (
    <Card className="flex flex-col w-full p-4 md:p-6 bg-background-surface backdrop-blur-[10px] rounded-[32px] border-white/[0.05]">
      <div className="flex items-center mb-4 gap-4">
        <div className="relative flex w-fit">
          <IconGradientBox className="w-10 h-10 text-primary" />
          <IconChat className="w-5 h-5 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h1 className="text-[20px] font-semibold text-app-white">Chat</h1>
      </div>

      <div className="bg-neutral-900 py-3 px-4 rounded-[16px] mb-8 border border-solid border-white/[0.05]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateComment)}>
            <div className="flex items-start mb-6">
              <UserAvatar name={address ?? ""} className="w-7 h-7 mr-2" />
              <FormField
                control={form.control}
                name="content"
                rules={createRules([rules.required("Please enter a message")])}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        className="flex-grow p-0 pt-1 bg-transparent border-none text-app-white placeholder-app-gray focus-visible:ring-offset-transparent focus-visible:ring-transparent focus-visible:ring-0"
                        placeholder="Leave a message for fellow explorers!"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {image && (
              <div className="mb-4 relative rounded-[16px] overflow-hidden w-fit">
                <ImageWithFallback
                  key={image}
                  src={image}
                  alt="Uploaded"
                  className="h-[120px] md:h-[200px] object-cover w-auto rounded-[16px]"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 w-6 h-6 bg-neutral-900 rounded-full hover:bg-neutral-900/80"
                  onClick={handleRemoveImage}
                >
                  <IconClose className="w-2 h-2" />
                </Button>
              </div>
            )}
            <div className="flex justify-between items-center">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileUpload}
              />
              <Button
                variant="ghost"
                size="icon"
                className="w-11 h-11 border border-solid border-white/[0.05] bg-white/[0.05] rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <IconCamera className="w-5 h-5 text-white" />
              </Button>
              <Button
                disabled={!address}
                type="submit"
                className="text-primary-dark bg-primary font-bold px-4 py-2 rounded-[12px] h-11"
              >
                Post <IconSend className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Button
        variant="outline"
        className="mb-6 bg-primary/20 text-primary border-none h-11 py-2 px-4 rounded-[8px] w-fit"
      >
        <IconMessage className="w-5 h-5 mr-2" />
        {comments.length} Comment{comments.length > 1 ? "s" : ""}
      </Button>

      <ScrollArea>
        <div className="max-h-[564px]">
          {sortedComments.map((comment, index) => (
            <div
              key={index.toString()}
              className="mb-4 last:mb-0 p-3 bg-neutral-900 rounded-[12px] mr-0 md:mr-4"
            >
              <div className="flex items-center mb-4">
                <UserAvatar
                  name={comment.userInfo.bio}
                  className="w-10 h-10 mr-3"
                />
                <div>
                  <span className="font-medium text-base text-app-white mr-2">
                    {shortAddress(comment.userInfo.bio)}
                  </span>
                  <span className="text-[#525252] text-sm leading-[20px]">
                    {DateTime.fromISO(comment.created_at).toRelative()}
                  </span>
                </div>
              </div>
              <p className="text-app-white text-sm">{comment.content}</p>
              {comment.image && (
                <div className="mt-4 relative rounded-[16px] overflow-hidden w-fit">
                  <ImageWithFallback
                    key={comment.image}
                    src={comment.image}
                    alt="Uploaded"
                    className="h-[120px] md:h-[200px] object-cover w-auto rounded-[16px]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
