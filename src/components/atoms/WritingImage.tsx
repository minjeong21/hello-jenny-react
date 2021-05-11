import styled from "styled-components";
const Image = styled.div<{ src: string; size?: string }>`
  background-image: url(${(props) => props.src});
  height: 100%;
  width: ${(props) => (props.size ? props.size : "250px")};
  background-size: cover;
  background-position: center;
  border-radius: 7px;
`;
interface IProps {
  imageUrl: string;
  size: string | null;
}
const WritingImage = ({ imageUrl, size }: IProps) => {
  return (
    <>
      {size ? <Image src={imageUrl} size={size} /> : <Image src={imageUrl} />}
    </>
  );
};

export default WritingImage;
