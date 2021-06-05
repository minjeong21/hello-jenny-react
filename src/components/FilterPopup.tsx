import React, { Fragment, useRef, useState } from "react";
import { useStores } from "states/Context";
import { Dialog, Transition } from "@headlessui/react";
import { toJS } from "mobx";
import FilterNavigation from "./molecules/FilterNavigation";
import PathManager from "utils/PathManager";
import SessionStorage from "utils/SessionStorage";

interface IProps {
  open: boolean;
  pathManager: PathManager;
  closePopup: () => void;
}
export default function FilterPopup({ open, pathManager, closePopup }: IProps) {
  const cancelButtonRef = useRef(null);
  const { writingStore } = useStores();

  const [levels, setLevels] = useState<string[]>(
    toJS(writingStore.selectedLevels)
  );
  const [themes, setThemes] = useState<string[]>(
    toJS(writingStore.selectedThemes)
  );

  const onClickFilterButton = (e: any) => {
    const element = e.target;
    const { name, value } = element;

    if (name === "level") {
      const idx = levels.indexOf(value);
      idx > -1 ? levels.splice(idx, 1) : levels.push(value);
    } else {
      const idx = themes.indexOf(value);
      idx > -1 ? themes.splice(idx, 1) : themes.push(value);
    }
    element.classList.toggle("active");
    checkBlank();
  };

  const checkBlank = () => {
    const saveButton: any = document.querySelector("#filter-save-button");
    if (levels.length === 0 || themes.length === 0) {
      saveButton.setAttribute("disabled", true);
    } else {
      saveButton.removeAttribute("disabled");
    }
  };

  const saveFilter = (e: any) => {
    writingStore.setSelectedLevel(levels);
    writingStore.setSelectedThemes(themes);

    const levelsString = writingStore.selectedLevels.join(",");
    const themesString = writingStore.selectedThemes.join(",");
    writingStore.fetchFilteredWritingAndUpdate(
      e,
      levelsString,
      themesString,
      pathManager
    );
    SessionStorage.saveSelectedLevels(levelsString);
    SessionStorage.saveSelectedThemes(themesString);
    closePopup();
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

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
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
                  <FilterNavigation
                    onClickFilter={onClickFilterButton}
                    selectedLevels={levels}
                    selectedThemes={themes}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  id="filter-save-button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-700 text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={saveFilter}
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
