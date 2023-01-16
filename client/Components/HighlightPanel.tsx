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
    <div className="p-0 m-0 w-1/3 h-1/2 flex flex-col items-center justify-center bg-white">
      <p className="">Created by : {highlightedArt['creator']}</p>
      <div className="p-0 m-0 h-96 w-96">
        <img
          className="h-full w-full"
          src={
            highlightedArt['image_src'] ||
            'https://res.cloudinary.com/deq8mjrh3/image/upload/v1673791045/communarty/dbwy84ch9dmiycxuojbq.jpg'
          }
        ></img>
      </div>
    </div>
  );
}
