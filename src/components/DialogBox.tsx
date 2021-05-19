import { observer } from "mobx-react";
import { useStores } from "states/Context";
import Writing from "utils/Writing";

const DialogBox = observer(({ writing }: { writing: Writing }) => {
  const { dialogStore } = useStores();
  dialogStore.setWriting(writing);

  return (
    <section>
      {/* 왼쪽 이미지 */}
      <div className="pad-xs ">
        <article className="pad-xs flex-1 solving-article">
          <div className={`dynamic-flex`}>
            <div className="pad-m"></div>
            {/* 설명 */}
          </div>
        </article>
        <section className="relative pt-2" id="explain-section">
          {dialogStore.dialogList.map((dialog, index) => (
            <div key={index}>{dialog.element}</div>
          ))}
        </section>
        <section>
          {dialogStore.getDialogs().length > 0 && dialogStore.dialogButtons && (
            <div className="flex justify-end pt-3 flex-wrap">
              {dialogStore.dialogButtons.map((item, index) => (
                <SmallButton
                  key={index}
                  text={item.label}
                  onClick={item.onClick}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
});

const SmallButton = ({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) => (
  <button
    onClick={onClick}
    className="focus:outline-none text-xs md:text-sm font-bold md:font-medium py-1 px-2 rounded-md text-white bg-brown-500 hover:bg-brown-700 ml-1"
  >
    {text}
  </button>
);
export default DialogBox;
