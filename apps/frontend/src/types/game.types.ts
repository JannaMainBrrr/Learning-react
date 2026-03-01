export type SystemSpec = {
  os?: string;
  cpu?: string;
  gpu?: string;
  ram?: string;
  storage?: string;
};

export type Requirements = {
  minimum: SystemSpec;
  recommended: SystemSpec;
};

//Típusok meghatározása + export kulcsszó mert itt most exportálni fogjuk az adatokat.
export type Game = {
  id: string; //route param, későbbi filterhez, maphoz
  title: string;
  coverUrl: string; /// public/ alatti kép útvonala, pl: "/covers/anno1800.png"
  description?: string;
  publisher?: string;
  platform?: string[];
  releaseYear?: number;
  genre?: string;
  tags?: string[];
  trailerUrl?: string;
  requirements?: Requirements;
  galleryUrls?: string[];
};
