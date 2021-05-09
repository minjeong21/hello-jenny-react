import styled from "styled-components";
const Container = styled.div`
  .triangle-left {
    width: 0;
    height: 0;
    margin: 10px 0px;
    border-top: 10px solid transparent;
    border-right: 20px solid rgba(243, 244, 246);
    border-bottom: 10px solid transparent;
  }
  .avatar-bg {
    border-radius: 25px;
  }
  .avatar {
    height: 40px;
    width: 40px;
  }
`;
const DialogBase = ({ children }: { children: any }) => {
  return (
    <Container className="flex m-2 mt-3 md:pl-40">
      <div>
        <div className="avatar-bg p-1 flex justify-center aligns-center bg-brown-200">
          <img
            className="avatar"
            src="/assets/jenny-avatar.png"
            alt="quokka avatar"
          />
        </div>
      </div>
      <div className="relative self-center flex-1">
        <div className="absolute triangle-left left-0 "></div>
        <div className="bg-gray-100 py-2 px-4 rounded-lg ml-4 fit-w shadow-md">
          {children}
        </div>
      </div>
    </Container>
  );
};

export const DialogTitle = ({ children }: { children: any }) => (
  <div className="font-cute font-bold pb-2">{children}</div>
);

export const DialogDescription = ({ children }: { children: any }) => (
  <div className="text-sm pr-12 whitespace-pre-line">{children}</div>
);
export default DialogBase;
