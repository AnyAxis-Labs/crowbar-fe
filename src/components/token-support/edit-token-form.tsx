import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "es-toolkit/compat";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  IconGradientBox,
  IconMagicWand,
  IconTelegram,
  IconWebsite,
  IconX,
} from "@/components/icons";
import { ToastCard } from "@/components/shared/toast-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useTaxFarmControllerFindOne, useTaxFarmControllerUpdate } from "@/services/queries";
import { isObjectEmpty } from "@/lib/utils";

const formSchema = z.object({
  tokenAddress: z.string().min(1, "Token address is required"),
  symbol: z.string().min(1, "Symbol is required"),
  name: z.string().min(1, "Name is required"),
  logo: z.string().optional(),
  banner: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  telegram: z.string().url("Invalid URL").optional(),
  X: z.string().url("Invalid URL").optional(),
});

export function EditTokenForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenAddress: "",
      symbol: "",
      name: "",
      logo: "",
      banner: "",
      description: "",
      website: "",
      telegram: "",
      X: "",
    },
  });

  const logo = form.watch("logo");
  const banner = form.watch("banner");
  const tokenAddress = form.watch("tokenAddress");
  const logoError = form.formState.errors.logo;
  const bannerError = form.formState.errors.banner;
  const isFormValid =
    form.formState.isValid && isObjectEmpty(form.formState.errors);

  // const { data: projectInformationResponse, isFetched } = useTaxFarmControllerFindOne(
  //   tokenAddress,
  //   {
  //     query: {
  //       enabled: !!tokenAddress,
  //     },
  //   },
  // );
  const projectInformation = get(
    {
      data: {
        tokenAddress: "",
        symbol: "",
        name: "",
        logo: "",
        banner: "",
        description: "",
        website: "",
        telegram: "",
        X: "",
      },
    },
    "data"
  );

  // const updateToken = useTaxFarmControllerUpdate();

  useEffect(() => {
    if (projectInformation) {
      form.setValue("symbol", projectInformation.symbol);
      form.setValue("name", projectInformation.name);
      form.setValue("logo", projectInformation.logo);
      form.setValue("banner", projectInformation.banner);
      form.setValue("description", projectInformation.description);
      form.setValue("website", projectInformation.website);
      form.setValue("telegram", projectInformation.telegram);
      form.setValue("X", projectInformation.X);
    }
  }, [projectInformation, form.setValue]);

  // useEffect(() => {
  //   if (!isFetched) return;

  //   if (!projectInformation) {
  //     form.setError("tokenAddress", { message: "Token not found" });
  //   } else {
  //     form.clearErrors("tokenAddress");
  //   }
  // }, [isFetched, projectInformation, form.setError, form.clearErrors]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isFormValid || !projectInformation) {
      return;
    }

    try {
      // await updateToken.mutateAsync({
      //   data: {
      //     ...values,
      //     tokenAddress: projectInformation.tokenAddress,
      //   },
      // });

      toast.custom((t) => (
        <ToastCard variant="success" title="Token updated" toastId={t} />
      ));
    } catch {
      toast.custom((t) => (
        <ToastCard variant="error" title="Failed to update token" toastId={t} />
      ));
    }
  }

  return (
    <Card className="max-w-[960px] mx-auto mix-blend-normal my-10 bg-[#18181b]/50 backdrop-blur-[20px] isolate border-white/[0.05] py-10 px-4 md:p-10 rounded-[32px]">
      <CardHeader className="p-0 mb-6">
        <div className="relative flex w-fit mb-6">
          <IconGradientBox className="w-[60px] h-[60px] md:w-20 md:h-20 text-primary" />
          <IconMagicWand className="w-7 h-7 md:w-10 md:h-10 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <CardTitle className="text-app-white text-center md:text-left text-[24px] md:text-[48px] font-semibold mt-0 mb-2 leading-[1.2]">
          Token Support
        </CardTitle>
        <p className="text-app-gray text-xs md:text-base text-center md:text-left">
          Fill in the details and launch your G@M3 token on Crowbar.so
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="tokenAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter the Token Contract Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 0xbC7193fc1b6072e1d5049f2C7a3Ff1E949284AFF"
                      {...field}
                      className="text-app-white placeholder:text-app-gray py-[10px] px-4 border border-solid border-white/[0.05] bg-neutral-900 rounded-[12px] h-11 focus-visible:ring-0 focus:border-primary-light"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Symbol</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: SHIB"
                      disabled
                      {...field}
                      className="text-app-white placeholder:text-app-gray py-[10px] px-4 border border-solid border-white/[0.05] bg-neutral-900 rounded-[12px] h-11 focus-visible:ring-0 focus:border-primary-light"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: SHIB"
                      disabled
                      {...field}
                      className="text-app-white placeholder:text-app-gray py-[10px] px-4 border border-solid border-white/[0.05] bg-neutral-900 rounded-[12px] h-11 focus-visible:ring-0 focus:border-primary-light"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description{" "}
                    <span className="text-white/60">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your token"
                      {...field}
                      className="text-app-white placeholder:text-app-gray py-[10px] px-4 border border-solid border-white/[0.05] bg-neutral-900 rounded-[12px] h-11 focus-visible:ring-0 focus:border-primary-light"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col">
              <h3 className="text-[24px] text-app-white font-semibold mb-2">
                Upload
              </h3>
              <p className="text-app-gray text-xs md:text-base mb-6">
                Define your token's identity with a custom logo and banner.
              </p>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="logo"
                      className="text-sm text-app-white font-normal"
                    >
                      Token Logo
                    </Label>
                    {logo && (
                      <button
                        type="button"
                        className="text-sm font-medium text-primary"
                        onClick={() => form.setValue("logo", "")}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {logo ? (
                    <img
                      src={logo}
                      alt="logo"
                      crossOrigin="anonymous"
                      className="w-[200px] h-[200px] max-w-[unset] rounded-[16px] object-cover"
                    />
                  ) : (
                    <ImageUploader
                      containerClassName="w-fit"
                      dropZoneClassName="w-[192px]"
                      maxSize={2 * 1024 * 1024}
                      buttonText="Upload Logo"
                      onUploadSuccess={(fileUrl) => {
                        form.setValue("logo", fileUrl);
                        form.clearErrors("logo");
                      }}
                    />
                  )}
                  {logoError && <FormMessage>{logoError.message}</FormMessage>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="banner"
                      className="text-sm text-app-white font-normal"
                    >
                      Add a Banner to Stand Out
                    </Label>
                    {banner && (
                      <button
                        type="button"
                        className="text-sm font-medium text-primary"
                        onClick={() => form.setValue("banner", "")}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {banner ? (
                    <img
                      src={banner}
                      alt="banner"
                      crossOrigin="anonymous"
                      className="w-full md:w-[442px] h-[200px] max-w-[unset] rounded-[16px] object-cover"
                    />
                  ) : (
                    <ImageUploader
                      containerClassName="w-full"
                      maxSize={5 * 1024 * 1024}
                      dropZoneClassName="w-full md:w-[442px]"
                      buttonText="Upload Banner"
                      onUploadSuccess={(fileUrl) => {
                        form.setValue("banner", fileUrl);
                        form.clearErrors("banner");
                      }}
                    />
                  )}
                  {bannerError && (
                    <FormMessage>{bannerError.message}</FormMessage>
                  )}
                </div>
              </div>
            </div>
            <div className="border-b border-white/[0.05] my-8 w-full h-[1px]" />
            <div className="flex flex-col">
              <h3 className="text-[24px] text-app-white font-semibold mb-2">
                Social Links
              </h3>
              <p className="text-app-gray text-xs md:text-base mb-6">
                Connect your token to the world through your social platforms.
              </p>
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>
                      Website <span className="text-white/60">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IconWebsite className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                        <Input
                          placeholder="Ex: https://shibatoken.com"
                          {...field}
                          className="text-app-white placeholder:text-app-gray py-[10px] px-4 pl-10 border border-solid border-white/[0.05] bg-neutral-900 rounded-[12px] h-11 focus-visible:ring-0 focus:border-primary-light"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegram"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>
                      Telegram <span className="text-white/60">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IconTelegram className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                        <Input
                          placeholder="Ex: https://t.me/shibtoken"
                          {...field}
                          className="text-app-white placeholder:text-app-gray py-[10px] px-4 pl-10 border border-solid border-white/[0.05] bg-neutral-900 rounded-[12px] h-11 focus-visible:ring-0 focus:border-primary-light"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="X"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Twitter <span className="text-white/60">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IconX className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                        <Input
                          placeholder="Ex: https://twitter.com/shibtoken"
                          {...field}
                          className="text-app-white placeholder:text-app-gray py-[10px] px-4 pl-10 border border-solid border-white/[0.05] bg-neutral-900 rounded-[12px] h-11 focus-visible:ring-0 focus:border-primary-light"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-sm md:text-base text-app-white">
              If your token isn’t visible on the website after 5min, you can
              manually setup your token page.
            </div>
            <Button
              type="submit"
              className="w-full bg-primary-light text-primary-dark font-semibold text-[18px] py-4 h-[56px] rounded-[16px]"
            >
              Update Token
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
