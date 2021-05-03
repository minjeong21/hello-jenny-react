import styled from "styled-components";
const Container = styled.div`
  .triangle-left {
    width: 0;
    height: 0;
    margin: 10px 0px;
    border-top: 10px solid transparent;
    border-right: 20px solid rgba(252, 231, 243);
    border-bottom: 10px solid transparent;
  }
`;
const DialogBase = ({ children }: { children: any }) => {
  return (
    <Container className="flex m-1">
      <div>
        <img src="/assets/small-quokka.png" width="50" />
      </div>
      <div className="relative self-center">
        <div className="absolute triangle-left left-0 "></div>
        <div className="bg-pink-100 p-2 flex-1 flex flex-row items-center rounded-lg ml-4">
          {children}
        </div>
      </div>
    </Container>
  );
};

export default DialogBase;
