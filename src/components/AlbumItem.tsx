import Link from "next/link";

type Props = {
  id: number;
  title: string;
};

export const AlbumItem = ({ id, title }: Props) => {
  return (
    <Link href={`/albums/${id}`} className="border mb-4 py-3 block">
      {title}
    </Link>
  );
};
