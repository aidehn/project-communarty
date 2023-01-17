type Contribution = {
  _id: string;
  owner_id: string;
  img_url: string;
  row: number;
  column: number;
};

type ContributionListProps = {
  contributionData: Contribution[];
};

export default function ContributionList({
  contributionData,
}: ContributionListProps) {
  return (
    <div className="m-0 p-0 flex flex-col overflow-y-scroll overflow-x-hidden nobar h-2/3">
      {contributionData.map((cont: Contribution) => (
        <div className="h-48 w-48 shadow-md m-4 mt-0">
          <img src={cont.img_url} className="h-full w-full"></img>
        </div>
      ))}
    </div>
  );
}
