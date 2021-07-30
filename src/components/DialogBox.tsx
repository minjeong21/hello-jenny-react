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
      </div>
    </section>
  );
});

export default DialogBox;
