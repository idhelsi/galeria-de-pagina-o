"use client";

import { useEffect, useState } from "react";
import { AlbumItem } from "@/components/AlbumItem";
import { Header } from "@/components/Header";
import { Album } from "@/types/Album";
import { api } from "@/utils/api"; 

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Album[]>([]);

  const loadAlbums = async () => {
    try {
      setLoading(true);
      const albums = await api.getAlbums();
      setList(albums);
    } catch (error) {
      console.error("Erro ao buscar os álbuns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Header />
      {loading && <p>Carregando...</p>}
      {list.map((item) => (
        <AlbumItem key={item.id} id={item.id} title={item.title} />
      ))}
    </div>
  );
};

export default Page;
