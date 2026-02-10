//Típusok meghatározása + export kulcsszó mert itt most exportálni fogjuk az adatokat.
export type Game = {
  id: string; //route param, későbbi filterhez, maphoz
  title: string;
  coverUrl: string; /// public/ alatti kép útvonala, pl: "/covers/anno1800.png"
};
//Ide is kell az export kulcsszó
export const GAMES: Game[] = [
  { id: "anno-1800", title: "Anno 1800", coverUrl: "/covers/anno1800.png" },
  { id: "apex", title: "Apex Legends", coverUrl: "/covers/apex.png" },
  { id: "bdo", title: "Black Desert", coverUrl: "/covers/bdo.png" },
  { id: "kam", title: "Knight and Merchants 2", coverUrl: "/covers/kam.png" },
  { id: "minecraft", title: "Minecraft", coverUrl: "/covers/minecraft.png" },
  { id: "overwatch", title: "Overwatch", coverUrl: "/covers/overwatch.png" },
  {
    id: "pubg",
    title: "PlayerUnknown's Battlegrounds",
    coverUrl: "/covers/pubg.png",
  },
];
