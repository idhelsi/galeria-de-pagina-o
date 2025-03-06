"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { PhotoItem } from "@/components/PhotoItem";
import { Album as AlbumType } from "@/types/Album";
import { Photo } from "@/types/Photo";
import { api } from "@/utils/api"; 

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
    const router = useRouter();
    const [id, setId] = useState<string | null>(null);
  
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Photo[]>([]);
    const [albumInfo, setAlbumInfo] = useState<AlbumType>({
      id: 0,
      title: "",
      userId: 0,
    });
  
    useEffect(() => {
      const resolveParams = async () => {
        const resolvedParams = await params; 
        setId(resolvedParams.id); 
      };
  
      resolveParams();
    }, [params]); 
  
    useEffect(() => {
      if (id) {
        loadPhotos(id);
        loadAlbumInfo(id);
      }
    }, [id]); 
  

  const loadPhotos = async (id: string) => {
    try {
      setLoading(true);
      const photos = await api.getPhotosFromAlbum(id);
      setList(photos);
    } catch (error) {
      console.error("Erro ao buscar as fotos:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumInfo = async (id: string) => {
    try {
      const albumInfo = await api.getAlbum(id);
      setAlbumInfo(albumInfo);
    } catch (error) {
      console.error("Erro ao buscar informações do álbum:", error);
    }
  };

  const handleBackButton = () => {
    router.back();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Header />
      <button onClick={handleBackButton} className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
        Voltar
      </button>

      <div className="mt-4">
        <p className="text-3xl font-bold my-5">{albumInfo.title}</p>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
            {list.map((item) => (
              <PhotoItem key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
