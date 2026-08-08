import { cva } from "class-variance-authority";
import Image from "next/image";

interface AuthorProps {
  image: string;
  name: string;
  size?: "sm" | "md";
}

const AuthorContainerVariant = cva("flex items-center gap-1", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-2",
    },
  },
});

const AuthorImageVariant = cva("rounded-full overflow-hidden", {
  variants: {
    size: {
      sm: "size-5",
      md: "md:size-6",
    },
  },
});

const AuthorNameVariant = cva("text-gray-500 dark:text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs md:text-sm",
      md: "text-sm md:text-base",
    },
  },
});

export function Author({ image, name, size = "md" }: AuthorProps) {
  return (
    <div className={AuthorContainerVariant({ size })}>
      <div className={AuthorImageVariant({ size })}>
        <Image
          className="object-cover w-full h-full"
          src={image || "/images/sidemenu/profile.png"}
          alt={name}
          width={20}
          height={20}
        />
      </div>
      <p className={AuthorNameVariant({ size })}>{name}</p>
    </div>
  );
}
