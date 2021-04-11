const DialogBase = ({ children }: { children: any }) => {
  return (
    <div className="flex">
      <div>
        <img src="/assets/header-rabit.png" width="50" />
      </div>
      <div className="align-center">{children}</div>
    </div>
  );
};

export default DialogBase;
