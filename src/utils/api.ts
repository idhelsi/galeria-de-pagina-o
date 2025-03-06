import axios from "axios";

const request = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com' // /album/1, /album/1/photos, /photos/1
})

export const api = {
    getAlbums: async () => {
        const req = await request('/albums');
        return req.data;
    },
    getAlbum: async (id: string) => {
        const req = await request(`/albums/${id}`);
        return req.data;
    },
    getPhotosFromAlbum: async (id: string) => {
        const req = await request(`/albums/${id}/photos`);
        return req.data;
    },
    getPhoto: async (id: string) => {
        const req = await request(`/photos/${id}`);
        return req.data;
    }
};