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

const AuthorImageVariant = cva("size-5 rounded-full overflow-hidden", {
  variants: {
    size: {
      sm: "",
      md: "md:size-6",
    },
  },
});

const AuthorNameVariant = cva(
  "text-gray-500 text-xs dark:text-muted-foreground truncate max-w-[75px] md:max-w-[400px]",
  {
    variants: {
      size: {
        sm: "md:text-sm",
        md: "md:text-base",
      },
    },
  },
);

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
          fetchPriority="high"
          loading="eager"
        />
      </div>
      <p className={AuthorNameVariant({ size })}>{name}</p>
    </div>
  );
}
