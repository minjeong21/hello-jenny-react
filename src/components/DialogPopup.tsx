import React, { Fragment, useRef, useState } from "react";
import { useStores } from "states/Context";
import { Dialog, Transition } from "@headlessui/react";
import { toJS } from "mobx";
import FilterNavigation from "./molecules/FilterNavigation";
import PathManager from "utils/PathManager";
import SessionStorage from "utils/SessionStorage";
import ITheme from "interface/ITheme";
import { useEffect } from "react";

interface IProps {
  open: boolean;
  pathManager: PathManager;
  closePopup: () => void;
}
export default function DialogPopup({ open, pathManager, closePopup }: IProps) {
  const cancelButtonRef = useRef(null);
  const { writingStore } = useStores();

  const [levels, setLevels] = useState<string[]>(
    toJS(writingStore.selectedLevels)
  );
  const [selectedThemes, setThemes] = useState<ITheme[]>(
    toJS(writingStore.selectedThemes)
  );
  const onClickLevelItem = (level: any) => {
    const idx = levels.indexOf(level);
    idx > -1 ? levels.splice(idx, 1) : levels.push(level);
    const element = document.querySelector(`[data-value='${level}']`);
    element?.classList.toggle("active");
    checkBlank();
  };

  const onClickThemeItem = (theme: ITheme) => {
    const targetIndex = selectedThemes.findIndex(
      (item) => item.name === theme.name
    );
    const element = document.querySelector(`[data-value='${theme.name}']`);

    if (targetIndex > -1) {
      selectedThemes.splice(targetIndex, 1);

      element?.classList.remove("active");
    } else {
      selectedThemes.push({
        id: 1,
        name: theme.name,
        display_name: theme.display_name,
        count: 0,
        description: "",
        image_url: theme.image_url,
        level: 1,
      });
      element?.classList.add("active");
    }
    console.log(selectedThemes);
    checkBlank();
  };

  const checkBlank = () => {
    const saveButton: any = document.querySelector("#filter-save-button");
    if (levels.length === 0 || selectedThemes.length === 0) {
      saveButton.setAttribute("disabled", true);
    } else {
      saveButton.removeAttribute("disabled");
    }
  };

  const resetClose = () => {
    setLevels(toJS(writingStore.selectedLevels));
    setThemes(toJS(writingStore.selectedThemes));
    closePopup();
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={resetClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {writingStore.themes && (
                    <FilterNavigation
                      onClickLevelItem={onClickLevelItem}
                      onClickThemeItem={onClickThemeItem}
                      selectedLevels={levels}
                      selectedThemes={selectedThemes}
                      themes={writingStore.themes}
                    />
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  id="filter-save-button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-700 text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => alert("적용하기")}
                >
                  적용하기
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={resetClose}
                  ref={cancelButtonRef}
                >
                  취소하기
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
