import styled from "styled-components";
const Image = styled.div<{ src: string; size?: string }>`
  background-image: url(${(props) => props.src});
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 7px;
`;
interface IProps {
  imageUrl: string;
  size: string | null;
}
const WritingImage = ({ imageUrl }: IProps) => {
  return (
    <>
      <Image src={imageUrl} />
    </>
  );
};

export default WritingImage;
