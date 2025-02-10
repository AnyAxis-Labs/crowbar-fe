import { useEffect, useState, type ComponentProps } from "react";
import { generateIdenteapot } from "@teapotlabs/identeapots";

import { cn, headAddress } from "@/lib/utils";
import ImageWithFallback from "./image-with-fallback";

interface UserAvatarProps extends ComponentProps<typeof ImageWithFallback> {
  name: string;
}

export const UserAvatar = ({ className, name, ...props }: UserAvatarProps) => {
  const [userAvatar, setUserAvatar] = useState<string>("");

  useEffect(() => {
    const fetchUserAvatar = async () => {
      const avatar = await generateIdenteapot(headAddress(name ?? ""));
      setUserAvatar(avatar);
    };

    fetchUserAvatar();
  }, [name]);

  return (
    <div className={cn("w-10 h-10 rounded-full overflow-hidden", className)}>
      <ImageWithFallback src={userAvatar} {...props} />
    </div>
  );
};
