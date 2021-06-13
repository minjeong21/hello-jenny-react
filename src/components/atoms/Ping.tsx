import styled from "styled-components";

const Container = styled.span`
  right: -3px;
  top: -3px;
`;
const Ping = () => (
  <Container className="flex h-3 w-3 absolute">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
  </Container>
);
export default Ping;
