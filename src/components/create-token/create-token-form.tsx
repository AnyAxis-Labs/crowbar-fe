import NiceModal from "@ebay/nice-modal-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { simulateContract, waitForTransactionReceipt } from "@wagmi/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
import { useAccount, useConfig, useWriteContract } from "wagmi";
import * as z from "zod";

import {
  IconGradientBox,
  IconMagicWand,
  IconTelegram,
  IconWebsite,
  IconX,
} from "@/components/icons";
import { ModalDeployingToken } from "@/components/shared/modal-deploying-token";
import { ModalError } from "@/components/shared/modal-error";
import { ModalSuccess } from "@/components/shared/modal-success";
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
import { TOKEN_FACTORY_ADDRESS } from "@/lib/constants";
import { useTaxFarmControllerUpsert } from "@/services/queries";
import { TokenFactoryV2Abi } from "@/smart-contracts/abi";

const formSchema = z.object({
  tokenName: z.string().min(1, "Token name is required"),
  tokenSymbol: z
    .string()
    .min(1, "Token symbol is required")
    .max(10, "Token symbol must be 10 characters or less"),
  logo: z.string(),
  banner: z.string(),
  description: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  telegram: z.string().url("Invalid URL").optional(),
  twitter: z.string().url("Invalid URL").optional(),
});

export function CreateTokenForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const logo = form.watch("logo");
  const banner = form.watch("banner");
  const logoError = form.formState.errors.logo;
  const bannerError = form.formState.errors.banner;

  const { address, chain } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const createTokenMutation = useTaxFarmControllerUpsert();
  const wagmiConfig = useConfig();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!address || !chain) {
      return;
    }

    setIsSubmitting(true);
    NiceModal.show(ModalDeployingToken);

    try {
      const txResult = await simulateContract(wagmiConfig, {
        abi: TokenFactoryV2Abi,
        address: TOKEN_FACTORY_ADDRESS[chain.id],
        functionName: "deployToken",
        args: [values.tokenName, values.tokenSymbol],
        value: chain.testnet ? parseEther("0.01") : parseEther("1"),
      });

      const txHash = await writeContractAsync({
        abi: TokenFactoryV2Abi,
        functionName: "deployToken",
        address: TOKEN_FACTORY_ADDRESS[chain.id],
        account: address,
        args: [values.tokenName, values.tokenSymbol],
        value: chain.testnet ? parseEther("0.01") : parseEther("1"),
      });

      await waitForTransactionReceipt(wagmiConfig, { hash: txHash });

      createTokenMutation.mutateAsync({
        data: {
          tokenAddress: txResult.result,
          logo: values.logo || "",
          banner: values.banner || "",
          description: values.description || "",
          website: values.website || "",
          telegram: values.telegram || "",
          X: values.twitter || "",
        },
      });

      NiceModal.hide(ModalDeployingToken);
      NiceModal.show(ModalSuccess);
      form.reset();
    } catch (e) {
      NiceModal.hide(ModalDeployingToken);
      NiceModal.show(ModalError);
      console.log("error", e);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-[960px] mx-auto mix-blend-normal my-10 bg-[#18181b]/50 backdrop-blur-[20px] isolate border-white/[0.05] py-10 px-4 md:p-10 rounded-[32px]">
      <CardHeader className="p-0 mb-6">
        <div className="relative flex mx-auto md:mx-0 w-fit mb-6">
          <IconGradientBox className="w-[60px] h-[60px] md:w-20 md:h-20 text-primary" />
          <IconMagicWand className="w-7 h-7 md:w-10 md:h-10 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <CardTitle className="text-app-white text-center md:text-left text-[24px] md:text-[48px] font-semibold mt-0 mb-2 leading-[1.2]">
          Create a new token
        </CardTitle>
        <p className="text-app-gray text-xs md:text-base text-center md:text-left">
          Fill in the details and launch your token into the Uni!
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="tokenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's Your Token Called?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Shibainu"
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
              name="tokenSymbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick a Short Symbol for Your Token!</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: SHIB"
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
                name="twitter"
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
              Only pay gas fees and the initial{" "}
              <span className="text-primary">1 ETH</span> for the liquidity
              which will be returned to you in less than{" "}
              <span className="text-primary">24 hours</span>.
            </div>
            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full bg-primary-light text-primary-dark font-semibold text-[18px] py-4 h-[56px] rounded-[16px]"
            >
              Deploy Token
            </Button>
          </form>
        </Form>
        <div className="text-sm md:text-base text-app-gray space-y-1 mt-6">
          <p>
            • Please read the Tutorial if you don't know how to make a token.
          </p>
          <p>• Only file types allowed are .png, .jpeg and .gif.</p>
          <p>• Maximum file size allowed is 1 MB.</p>
        </div>
      </CardContent>
    </Card>
  );
}
