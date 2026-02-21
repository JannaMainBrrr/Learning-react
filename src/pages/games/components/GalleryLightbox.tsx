type Props = {
  title: string;
  urls: string[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function GalleryLightbox({
  title,
  urls,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: Props) {
  /*
    0) Accessibility (a11y) attribútumok:
      --> role="dialog": screen readernek jelzi, hogy ez egy dialógusablak
      -->aria-modal="true": azt jelzi, hogy “modális”, tehát a háttér tartalom most nem az aktív
    1) a "lightbox" onClickje bezárja az elemet, a modal szerű viselkedést (felugró ablak, háttérbe szorul a többi tartalom) a css-ben határoztuk meg a z-index rétegsorrenddel.
    2) onClick -nél Event bubbling: A legbelső elemre kattintva az esemény felbuborékol a szülőig, végül a .lightbox-ig, így minden kattintás bezárná a lightboxot, még a Next/Prev gombok is.
        Layout:
          lightbox (overlay háttér)
          └── lightbox__content (középső doboz)
              ├── Prev button
              ├── img
              └── Next button
        Az onclick esemény létrejön az <img>-n -> felmegy a parentre ami a  "lightbox__content" <div> -> felmegy a "lightbox" <div>-re ami bezáródna, mert rajta van az onClick close() 
        Technikailag lehetne a gombokon is a StopPropagation, de az ismétlés lenne, nehezebben bővíthető.

    */
  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button" //ha a lightbox valaha egy <form>-on belül jelenne meg (vagy a DOM-ban valahol form van), a <button> default type="submit". type="button" biztosítja, hogy ne submitoljon semmit.
          className="lightbox__nav lightbox__nav--prev"
          onClick={onPrev}
          aria-label="Previous image"
        >
          ‹
        </button>

        <img
          className="lightbox__image"
          src={urls[activeIndex]}
          alt={`${title} screenshot ${activeIndex + 1}`}
        />

        <button
          type="button"
          className="lightbox__nav lightbox__nav--next"
          onClick={onNext}
          aria-label="Next image"
        >
          ›
        </button>
      </div>
    </div>
  );
}
