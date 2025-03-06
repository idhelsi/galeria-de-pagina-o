import { Photo } from "@/types/Photo";
import Link from "next/link";

type Props = {
  data: Photo;
};

export const PhotoItem = ({ data }: Props) => {
  return (
    <Link
      href={`/albums/${data.id}/photos`}
      className="border-2 border-white p-5 cursor-pointer m-2 inline-block no-underline text-white hover:bg-gray-200"
    >
      <img src={data.thumbnailUrl} alt={data.title} className="w-full h-auto" />
    </Link>
  );
};
