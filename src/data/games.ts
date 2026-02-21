export type SystemSpec = {
  os?: string;
  cpu?: string;
  gpu?: string;
  ram?: string;
  storage?: string;
};

export type Requirements = {
  minimum?: SystemSpec;
  recommended?: SystemSpec;
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
//Ide is kell az export kulcsszó
export const GAMES: Game[] = [
  {
    id: "anno-1800",
    title: "Anno 1800",
    coverUrl: "/covers/anno1800.png",
    description:
      "Anno 1800 takes place in the 19th century at the dawn of the Industrial Age. Like other Anno games, Anno 1800 is a city-building and strategy game. While it is set in the context of colonial trade, the featured architecture is Victorian era and the economic engine is factory labour. The core gameplay of Anno 1800 takes place in the Old World, where the needs of the citizens, workers and artisans are central to the management of production and supply chains. A parallel New World city exists, which produces products that laborers in the Old World want to purchase, thus trade routes need to be established.",
    publisher: "Ubisoft",
    platform: ["PC"],
    releaseYear: 2019,
    genre: "City Builder",
    tags: ["Strategy", "Economy", "Sandbox"],
    trailerUrl: "https://www.youtube.com/embed/UowsqoV0egc",
    requirements: {
      minimum: {
        os: "Windows 10 (64-bit)",
        cpu: "Intel i5-3470 / AMD FX-6350",
        gpu: "GTX 670 / Radeon R9 270X",
        ram: "8 GB",
        storage: "60 GB",
      },
      recommended: {
        os: "Windows 10 (64-bit)",
        cpu: "Intel i5-4690K / Ryzen 5 1500X",
        gpu: "GTX 970 / RX 480",
        ram: "16 GB",
        storage: "60 GB SSD",
      },
    },
    galleryUrls: [
      "/games/anno-1800/anno-1800-01.webp",
      "/games/anno-1800/anno-1800-02.webp",
      "/games/anno-1800/anno-1800-03.webp",
      "/games/anno-1800/anno-1800-04.webp",
    ],
  },
  {
    id: "apex",
    title: "Apex Legends",
    coverUrl: "/covers/apex.png",
    description:
      "Apex Legends is a 2019 battle royale-hero shooter video game developed by Respawn Entertainment and published by Electronic Arts, set in the same science fiction universe as Respawn's Titanfall series. It is offered free-to-play and is continuously updated under the games as a service model; the game was originally released for PlayStation 4, Windows, and Xbox One in February 2019 and was followed by versions for Nintendo Switch in 2021 and both PlayStation 5 and Xbox Series X/S in 2022, and Nintendo Switch 2 in 2025. All versions support cross-platform multiplayer. A mobile version designed for touchscreens was briefly available until its discontinuation in 2023.",
    publisher: "Electronic Arts",
    platform: ["PC"],
    releaseYear: 2019,
    genre: "Battle royale / Hero shooter",
    tags: [
      "Battle Royale",
      "Hero Shooter",
      "FPS",
      "Multiplayer",
      "Free-to-play",
    ],
    trailerUrl: "https://www.youtube.com/embed/XRNJoZD_nvQ",
    requirements: {
      minimum: {
        os: "64-bit Windows 7",
        cpu: "Intel Core i3-6300 / AMD FX-4350",
        gpu: "NVIDIA GeForce GT 640 / AMD Radeon HD 7730",
        ram: "6 GB",
        storage: "60",
      },
      recommended: {
        os: "64-bit Windows 7",
        cpu: "Intel Core i5-3570K / Ryzen 5 (or equivalent)",
        gpu: "NVIDIA GeForce GTX 970 / AMD Radeon R9 290",
        ram: "8 GB",
        storage: "60 GB SSD",
      },
    },
    galleryUrls: [
      "/games/apex/apex-01.webp",
      "/games/apex/apex-02.webp",
      "/games/apex/apex-03.webp",
      "/games/apex/apex-04.webp",
    ],
  },
  {
    id: "bdo",
    title: "Black Desert",
    coverUrl: "/covers/bdo.png",
    description:
      "Black Desert Online is a sandbox-oriented fantasy massively multiplayer online role-playing game developed by Korean video game developer Pearl Abyss and originally published for Microsoft Windows in 2015. A mobile version titled Black Desert Mobile was initially released in Asia by early 2019, and worldwide in December 2019. The Xbox One and PlayStation 4 versions, known simply as Black Desert, were released in 2019. The game is free-to-play in some parts of the world, but follows a buy-to-play business model in other editions, including the English-language editions",
    publisher: "Pearl Abyss",
    platform: ["PC", "PlayStation", "Xbox", "Mobile"],
    releaseYear: 2016,
    genre: "MMORPG",
    tags: ["MMORPG", "Fantasy", "Action", "Open World", "Multiplayer"],
    trailerUrl: "https://www.youtube.com/embed/DD4zMOvRrzM",
    requirements: {
      minimum: {
        os: "Windows 10 or higher",
        cpu: "Intel Core i3-530 2.9GHz",
        gpu: "GTS 250 / GeForce 9800 GTX / Radeon HD 3870 X2",
        ram: "4 GB",
        storage: "40 GB",
      },
      recommended: {
        os: "Windows 10 or higher",
        cpu: "Intel Core i5-650 3.2GHz",
        gpu: "NVIDIA GTX 970 / AMD RX 480",
        ram: "8 GB",
        storage: "40 GB",
      },
    },
    galleryUrls: [
      "/games/bdo/bdo-01.webp",
      "/games/bdo/bdo-02.webp",
      "/games/bdo/bdo-03.webp",
      "/games/bdo/bdo-04.webp",
    ],
  },
  {
    id: "knight-and-merchants",
    title: "Knight and Merchants: The Peasants Rebellion",
    coverUrl: "/covers/kam.png",
    description:
      "Knight and Merchants: The Peasants Rebellion is a classic medieval real-time strategy game focused on economy-driven gameplay and detailed production chains. Instead of relying solely on military strength, players must carefully build and manage a functioning settlement where every weapon, tool, and piece of food is produced step by step from raw materials. From harvesting grain to forging swords, each resource flows through a realistic chain of workers and buildings. Set in a war-torn kingdom, the player takes command of loyal forces to restore order and defeat rebellious factions while maintaining a stable economy and population.",
    publisher: "TopWare Interactive",
    platform: ["PC"],
    releaseYear: 1998,
    genre: "Real-Time Strategy",
    tags: ["RTS", "Medieval", "Economy", "City Building", "Classic"],
    trailerUrl: "",
    requirements: {
      minimum: {
        os: "Windows 95 / 98",
        cpu: "Pentium 166 MHz",
        gpu: "2 MB DirectX-compatible graphics card",
        ram: "32 MB",
        storage: "500 MB",
      },
      recommended: {
        os: "Windows 98 / XP",
        cpu: "Pentium II 233 MHz or higher",
        gpu: "8 MB DirectX-compatible graphics card",
        ram: "64 MB",
        storage: "500 MB",
      },
    },
    galleryUrls: [
      "/games/kam/kam-01.webp",
      "/games/kam/kam-02.webp",
      "/games/kam/kam-03.webp",
      "/games/kam/kam-04.webp",
    ],
  },
  {
    id: "minecraft",
    title: "Minecraft",
    coverUrl: "/covers/minecraft.png",
    description: `Minecraft is a sandbox game developed by Mojang Studios and officially released in 2011. 
      Players explore a procedurally generated world made of blocks, gather resources, craft tools, build structures, and survive against hostile creatures.
      The game offers both single-player and multiplayer experiences, supported by a massive community that creates mods, custom maps, servers, and texture packs.
      With over 350 million copies sold, Minecraft is the best-selling video game of all time and remains one of the most influential titles in gaming history.`,
    publisher: "Xbox Game Studios",
    platform: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"],
    releaseYear: 2011,
    genre: "Sandbox / Survival",
    tags: ["Sandbox", "Survival", "Open World", "Crafting", "Multiplayer"],
    trailerUrl: "https://www.youtube.com/embed/r6Ja2ZxWbRE",
    requirements: {
      minimum: {
        os: "Windows 10 version 19041.0 or higher",
        cpu: "Intel Core i3-3210 / AMD A8-7600 APU",
        gpu: "Intel HD Graphics 4000 / AMD Radeon R5 series",
        ram: "4 GB",
        storage: "1 GB",
      },
      recommended: {
        os: "Windows 10 or 11 (latest update)",
        cpu: "Intel Core i5-4690 / AMD A10-7800",
        gpu: "NVIDIA GeForce 700 Series / AMD Radeon Rx 200 Series",
        ram: "8 GB",
        storage: "4 GB SSD",
      },
    },
    galleryUrls: [
      "/games/minecraft/mc-01.webp",
      "/games/minecraft/mc-02.webp",
      "/games/minecraft/mc-03.webp",
      "/games/minecraft/mc-04.webp",
    ],
  },
  {
    id: "ow2",
    title: "Overwatch 2",
    coverUrl: "/covers/overwatch2.png",
    description: `After ten years, Season 1 opens the first chapter of Overwatch's next big story, where your choices will put you right into the fight for the future! For the first time, five new Heroes hit the roster together, bringing new playstyles, new dynamics, and new voices into the fray all at once. Jet Pack Cat, Anran, Domina, Emre, and Mizuki arrive just in time for Reign of Talon: Conquest, launching a year-long narrative where conflict takes center stage and you contribute to how it unfolds. Choose where you stand as Overwatch and Talon collide in a faction-driven event with outcomes that will leave visible marks on the world and your legacy. Along the way, Competitive gets a refresh and Core gameplay evolves, changing how things feel across the board. This season sets a fresh tone for how the Overwatch story is told and how you play it.`,
    publisher: "Blizzard Entertainment",
    platform: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    releaseYear: 2022,
    genre: "Hero Shooter / FPS",
    tags: ["Hero Shooter", "FPS", "Multiplayer", "Team-Based", "Competitive"],
    trailerUrl: "https://www.youtube.com/embed/LGgqyer-qr4",
    requirements: {
      minimum: {
        os: "Windows 10 64-bit",
        cpu: "Intel Core i3 / AMD Phenom X3 8650",
        gpu: "NVIDIA GeForce GTX 600 series / AMD Radeon HD 7000 series",
        ram: "6 GB",
        storage: "50 GB",
      },
      recommended: {
        os: "Windows 10 64-bit",
        cpu: "Intel Core i7 / AMD Ryzen 5",
        gpu: "NVIDIA GeForce GTX 1060 / AMD R9 380",
        ram: "8 GB",
        storage: "50 GB SSD",
      },
    },
    galleryUrls: [
      "/games/ow2/ow2-01.webp",
      "/games/ow2/ow2-02.webp",
      "/games/ow2/ow2-03.webp",
      "/games/ow2/ow2-04.webp",
    ],
  },
  {
    id: "pubg",
    title: "PlayerUnknown's Battlegrounds",
    coverUrl: "/covers/pubg.png",
    description: `PUBG: Battlegrounds (previously titled PlayerUnknown's Battlegrounds) is a 2017 battle royale video game published by Krafton, and developed by Krafton's PUBG Studios. The game, which was inspired by the Japanese film Battle Royale (2000), is based on previous mods created by Brendan "PlayerUnknown" Greene for other games, and expanded into a standalone game under Greene's creative direction. Played from either a third-person or first-person perspective, up to one hundred players parachute onto an island where they are tasked to scavenge for weapons and equipment to kill other players while avoiding getting killed themselves. The available safe area of the game's map decreases in size over time, directing surviving players into an ever-tightening space to force encounters.`,
    publisher: "KRAFTON, Inc.",
    platform: ["PC", "PlayStation", "Xbox"],
    releaseYear: 2017,
    genre: "Battle Royale / FPS",
    tags: ["Battle Royale", "FPS", "Multiplayer", "Shooter", "Competitive"],
    trailerUrl: "https://www.youtube.com/embed/fDLAFIhfFy4",
    requirements: {
      minimum: {
        os: "Windows 10 64-bit",
        cpu: "Intel Core i5-4430 / AMD FX-6300",
        gpu: "NVIDIA GeForce GTX 960 2GB / AMD Radeon R7 370 2GB",
        ram: "8 GB",
        storage: "40 GB",
      },
      recommended: {
        os: "Windows 10 64-bit",
        cpu: "Intel Core i5-6600K / AMD Ryzen 5 1600",
        gpu: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
        ram: "16 GB",
        storage: "50 GB SSD",
      },
    },
    galleryUrls: [
      "/games/pubg/pubg-01.webp",
      "/games/pubg/pubg-02.webp",
      "/games/pubg/pubg-03.webp",
      "/games/pubg/pubg-04.webp",
    ],
  },
];
