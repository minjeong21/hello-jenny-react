const SectionBadge = () => {
  return (
    <>
      <section className=" mt-3 bg-white shadow-md rounded-md p-5">
        <ul className="flex gap-12 pb-6 text-gray-700">
          <li className="py-1 rounded-lg">
            <span className="font-bold">100 </span> sentences
          </li>
          <li className="py-1 rounded-lg">
            <span className="font-bold">3</span> thems
          </li>
          <li className="py-1 rounded-lg">
            <span className="font-bold">150 </span> days visited
          </li>
        </ul>
        <div className="col-span-2 flex items-center">

          <div className="mr-5 bg-gray-200">
            <img
              src="https://i.pinimg.com/originals/52/66/81/52668161fff4bea0d9bca989bdb8a1ae.jpg"
              className="w-16"
            />
          </div>

          <div className="flex flex-col">
            <span className="mb-2 text-gray-800 text-2xl font-medium leading-4">
              꽃 뱃지를 모아봐요 💕
            </span>
            <span className=" text-sm text-gray-700 font-normal leading-4">
              3개의 뱃지를 더 모으면, 쥬디 캐릭터를 열 수 있어요!
            </span>
          </div>
          {/* 뱃지 설명 */}
        </div>
        <div className="pt-6 pb-3">
          <div className="flex gap-2 justify-center">
            <Badge
              label={"3일 연속 출석"}
              lock={false}
              imageUrl={"/assets/flower-1.png"}
            />
            <Badge
              label={"7일 누적 출석"}
              lock={false}
              imageUrl={"/assets/flower-2.png"}
            />
            <Badge
              label={"7일 연속 출석"}
              lock={false}
              imageUrl={"/assets/flower-3.png"}
            />
            <Badge
              label={"14일 누적 출석"}
              lock={false}
              imageUrl={"/assets/flower-1.png"}
            />
          </div>
        </div>
      </section>
      {/* 실제 뱃지 */}
      <div className="mt-6 xl:mt-0 rounded-lg h-48 bg-main">
        <div className="flex h-full justify-between">
          <div className="relative h-full flex-1">
            <FlowerBadges index={6} url={"/assets/flower-1.png"} />
          </div>

          <div className="relative h-full flex-1">
            <FlowerBadges index={3} url={"/assets/flower-2.png"} />
          </div>
          <div className="relative h-full flex-1">
            <FlowerBadges index={2} url={"/assets/flower-3.png"} />
          </div>
        </div>
      </div>
    </>
  );
};

// 뱃지
const Badge = ({
  label,
  lock,
  imageUrl,
}: {
  label: string;
  lock: boolean;
  imageUrl: string;
}) => {
  return (
    <div className="flex flex-col self-end items-center relative">
      <img
        src={
          lock
            ? "https://st2.depositphotos.com/3907761/7233/v/600/depositphotos_72338459-stock-illustration-01208a.jpg"
            : imageUrl
        }
        className={`w-14 h-14 border-2 border-white rounded-full shadow-md ${lock ? "opacity-50" : ""
          }`}
      />
      <span
        className={`${lock
          ? "bg-gray-200 text-gray-500"
          : "bg-brown-600 text-white font-bold"
          } mt-1 shadow text-sm font-medium px-2 py-x rounded-md`}
      >
        {label}
      </span>
    </div>
  );
};

const FlowerBadges = ({ index, url }: { index: number; url: string }) => {
  const fields: JSX.Element[] = [];
  let margin = "ml-0";
  for (let i = 0; i < index; i++) {
    fields.push(<BadgeImage index={i} imageUrl={url} />);
  }

  switch (index) {
    case 1:
      margin = "ml-1";
      break;
    case 2:
      margin = "ml-30 mb-20";
  }
  return <div className={`absoulte ${margin}`}>{fields}</div>;
};

const BadgeImage = ({
  imageUrl,
  index,
}: {
  imageUrl: string;
  index: number;
}) => {
  const random = Math.ceil(Math.random() * 5);
  return (
    <div className="p">
      <img
        style={{ left: index * 10 }}
        src={imageUrl}
        className={`w-14 h-14 rounded-full absolute bottom-${random}`}
      />
    </div>
  );
};

export default SectionBadge;
