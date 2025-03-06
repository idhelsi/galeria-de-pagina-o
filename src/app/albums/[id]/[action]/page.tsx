"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Photo as PhotoType } from "@/types/Photo";
import { api } from "@/utils/api"; 

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photoInfo, setPhotoInfo] = useState<PhotoType | null>(null);
  const [id, setId] = useState<string | null>(null); 

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params; 
      setId(resolvedParams.id); 
    };

    resolveParams();
  }, [params]); 

  useEffect(() => {
    if (id) {
      loadPhoto(id);
    }
  }, [id]); 

  const loadPhoto = async (id: string) => {
    try {
      setLoading(true);
      const photo = await api.getPhoto(id);
      setPhotoInfo(photo);
    } catch (error) {
      console.error("Erro ao buscar a foto:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackButton = () => {
    router.back();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {loading && <p>Carregando...</p>}

      {photoInfo && (
        <>
          <button
            onClick={handleBackButton}
            className="text-black mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-600 rounded"
          >
            Voltar
          </button>
          <p className="text-xl font-bold my-3">{photoInfo.title}</p>
          <img
            src={photoInfo.url}
            alt="150x150"
            className="text-center bg-amber-500 border w-99 h-99 rounded-lg shadow-md"
          />
        </>
      )}
    </div>
  );
};

export default Page;
