const DialogBase = ({ children }: { children: any }) => {
  return (
    <div className="flex sm:mt-2 mt-1 sm:pl-40">
      <div>
        <div className="rounded-3xl p-1 flex justify-center aligns-center bg-brown-200">
          <img
            className=" w-10 sm:w-10 h-10 sm:h-10"
            src="/assets/jenny-avatar.png"
            alt="quokka avatar"
          />
        </div>
      </div>
      <div className="relative self-center flex-1 pb-1">
        <div className="bg-white sm:py-2 py-1.5 sm:px-4 px-2 rounded-lg ml-2 fit-w shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export const DialogTitle = ({ children }: { children: any }) => (
  <div className="font-semibold tracking-tight sm:text-base text-sm inline">
    {children}
  </div>
);

export const DialogDescription = ({ children }: { children: any }) => (
  <div className="sm:text-sm text-xs pt-2">{children}</div>
);
export default DialogBase;
