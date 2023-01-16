type HighlightPanelProps = {
  highlightedArt: HighlightedArtInfo;
};

type HighlightedArtInfo = {
  creator: string;
  image_src: string;
};

export default function HighlightPanel({
  highlightedArt,
}: HighlightPanelProps) {
  return (
    <div className="p-5 m-0 w-fit h-fit flex flex-col items-start justify-center bg-transparent">
      <p className="my-2 font-bold text-xl ">
        /<span className="text-cobalt">art</span>/ {highlightedArt['creator']}
      </p>
      <div className="p-0 m-0 h-48 w-48 border-3 border-black rounded">
        <img
          className="h-full w-full shadow-lg"
          src={highlightedArt['image_src']}
        ></img>
      </div>
    </div>
  );
}