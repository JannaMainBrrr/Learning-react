import { useEffect, useState } from "react";
import type { Game } from "../types/game.types";
import type { AsyncState } from "../types/async.types";
import { getGames } from "../services/games.service";

/*
A hook feladata lesz kezelni a:
    async (loading) részt
    hibát
    state-t
    react Lifecyclet
    stb.
Érdemes külön fileba megírni, hogy ne kelljen minden komponensben megismételni.
 */
