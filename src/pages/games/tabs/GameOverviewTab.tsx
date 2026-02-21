import { useOutletContext } from "react-router-dom";
import type { GameDetailsOutletContext } from "../GameDetailsPage";
import { useState } from "react";
import GalleryLightbox from "../components/GalleryLightbox";
import "./GameOverviewTab.css";
/*
A requirements.minimum és requirements.recommended ugyanazokat a mezőket tartalmazza. Kézzel írva: <li>OS: {min.os}</li>
Ez redundáns + Ha bővítenénk pl. a spect, akkor kézzel a jsx-ben is át kéne írni.
A cél 1 lista, amely megmondja: Milyen mezőket, milyen sorrendben és milyen felirattal jelenítünk meg.
Majd ebből a listából generáljuk le a sorokat.

Az as const kulcsszó azért kell, hogy a tömb elemei readonly-k, a stringek pedig literal típusok legyenek.
Tehát az "os" típusa nem string kell hogy legyen, ami ilyenkor default, hanem konkrétan "os" típus és a TS le tudja vezetni a uniont: "os" | "cpu" | "gpu" | "ram" | "storage"
 */
const SPEC_FIELDS = [
  { key: "os", label: "OS" },
  { key: "cpu", label: "CPU" },
  { key: "gpu", label: "GPU" },
  { key: "ram", label: "RAM" },
  { key: "storage", label: "Storage" },
] as const;

export default function GameOverviewTab() {
  const { game } = useOutletContext<GameDetailsOutletContext>();
  //Kivesszük ide a megfelelő tartalmat, ez vagy SystemSpec vagy undefined lehet
  //Ez ugye ilyenkor pl minSpec.os vagy minSpec.gpu ugyanúgy.
  const minSpec = game.requirements?.minimum;
  const recSpec = game.requirements?.recommended;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryUrls = game.galleryUrls ?? [];

  return (
    <div className="overviewTab">
      <div className="overviewTab__topSummary">
        <h1 className="overviewTab__title">{game.title}</h1>
        <div className="overviewTab__meta">
          {game.releaseYear && <span>{game.releaseYear}</span>}
          {game.genre && <span>{game.genre}</span>}
          {game.platform && game.platform.length > 0 && (
            <span>{game.platform.join(", ")}</span>
          )}
          {game.publisher && <span>{game.publisher}</span>}
        </div>
        <ul className="overviewTab__tags">
          {game.tags?.map((tag) => (
            <li key={tag} className="overviewTab__tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="overviewTab__media">
        <div>
          <h2 className="overviewTab__sectionTitle">Description</h2>

          <div className="overviewTab__description">
            {game.description ? (
              <p>{game.description}</p>
            ) : (
              <p className="overviewTab__placeholder">
                No description available.
              </p>
            )}
          </div>
        </div>

        <div className="overviewTab__videoWrapper">
          <h2 className="overviewTab__sectionTitle">Official Trailer</h2>

          <div className="overviewTab__video">
            {game.trailerUrl ? (
              <iframe
                className="overviewTab__iframe"
                src={game.trailerUrl}
                title={`${game.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="overviewTab__videoPlaceholder">
                No trailer available
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="overviewTab__requirements">
        <div className="overviewTab__requirementsCard">
          <h3>Minimum</h3>
          {minSpec ? (
            <ul className="overviewTab__specList">
              {SPEC_FIELDS.map(({ key, label }) => {
                const value = minSpec[key];
                if (!value) return null;

                return (
                  <li key={key} className="overviewTab__specRow">
                    <span className="overviewTab__specLabel">{label}: </span>
                    <span className="overviewTab__specValue">{value}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No minimum requirements provided.</p>
          )}
        </div>
        <div className="overviewTab__requirementsCard">
          <h3>Recommended</h3>
          {recSpec ? (
            <ul className="overviewTab__specList">
              {/* Mappolunk a SPEC_FIELDS-en -> key pl. "cpu" lesz, így a recSpec.cpu-t kapjuk meg: Intel i5-3470 */}
              {SPEC_FIELDS.map(({ key, label }) => {
                const value = recSpec[key];
                if (!value) return null;

                return (
                  <li key={key} className="overviewTab__specRow">
                    <span className="overviewTab__specLabel">{label}: </span>
                    <span className="overviewTab__specValue">{value}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No recommended requirements provided.</p>
          )}
        </div>
      </div>
      {/*Ez a gallery preview grid, mindig látszik + beállítja az activeIndex statet a kép INDEXÉVEL */}

      <div className="overviewTab__gallery">
        {game.galleryUrls?.map((url, index) => (
          <img
            key={url}
            className="overviewTab__galleryImage"
            src={url}
            alt={`${game.title} gallery picture ${index + 1}`}
            loading="lazy"
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      {/* Ez a lightbox, ami alapból nem látszik
      Alapból nem látszik, de ha kattintanak az overviewTab__galleryImagen, akkor átáll a state és megjelenik ez a komponens
      */}
      {activeIndex !== null && galleryUrls.length > 0 && (
        <GalleryLightbox
          title={game.title}
          urls={galleryUrls}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onPrev={() =>
            setActiveIndex((prev) =>
              prev === null
                ? null
                : (prev - 1 + galleryUrls.length) % galleryUrls.length,
            )
          }
          onNext={() =>
            setActiveIndex((prev) =>
              prev === null ? null : (prev + 1) % galleryUrls.length,
            )
          }
        />
      )}
    </div>
  );
}
