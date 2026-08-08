import type { GetTeamIdPosts200PostsItem } from "@/apis/model";
import Image from "next/image";
import Link from "next/link";
import { CardInformation } from "../../CommunityCard/CardInformation/CardInformation";

export function BestViewCard({ post }: { post: GetTeamIdPosts200PostsItem }) {
  return (
    <article>
      <Link
        className="w-[260px] block bg-white dark:bg-card shadow-md rounded-[16px] py-4 px-8 md:p-8 md:w-[384px]"
        href={`/community/${post.id}`}
      >
        <div>
          <p className="font-semibold text-gray-900 dark:text-foreground mb-3 md:text-xl md:font-semibold md:mb-4">
            {post.title}
          </p>
          <div className="size-[100px] relative">
            {post.image && (
              <Image
                className="size-full object-cover"
                src={post.image}
                alt={post.title}
                width={100}
                height={100}
              />
            )}
          </div>
          <div className="mt-4">
            <CardInformation variant="best" post={post} />
          </div>
        </div>
      </Link>
    </article>
  );
}
