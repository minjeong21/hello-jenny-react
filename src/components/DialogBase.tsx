import styled from "styled-components";
const DialogBase = ({ children }: { children: any }) => {
  return (
    <div className="flex md:mt-2 mt-1 md:pl-40">
      <div>
        <div className="rounded-3xl p-1 flex justify-center aligns-center bg-brown-200">
          <img
            className=" w-10 md:w-12 "
            src="/assets/jenny-avatar.png"
            alt="quokka avatar"
          />
        </div>
      </div>
      <div className="relative self-center flex-1 pb-2">
        <div className="bg-white md:py-2 py-1.5 md:px-4 px-2 rounded-lg ml-2 fit-w shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export const DialogTitle = ({ children }: { children: any }) => (
  <div className="font-semibold tracking-tight md:text-base text-sm inline">
    {children}
  </div>
);

export const DialogDescription = ({ children }: { children: any }) => (
  <div className="md:text-sm text-xs pt-2">{children}</div>
);
export default DialogBase;
