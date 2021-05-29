import styled from "styled-components";

const Container = styled.div`
  input {
    width: 100%;
    padding: 10px;
  }
  #explain-section {
    max-height: 300px;
    overflow-y: auto;
  }
`;

const SkeletonWritingBox = () => {
  return (
    <Container className="p-4 md:p-0" id="writing-box">
      {/* <!-- card --> */}
      <div className="bg-white md:p-6 mt-2 p-3 md:flex rounded-lg shadow-custom">
        {/* <!-- image --> */}
        <div className="h-60 w-64 bg-gray-200 rounded-lg animate-pulse hidden md:block"></div>
        {/* Tags */}
        <div className="md:px-5 md:py-2 flex-1">
          <div className="flex md:mb-4 ">
            <div className="h-6 w-16 rounded-sm bg-gray-200 animate-pulse mr-3"></div>
            <div className="h-6 w-16 rounded-sm bg-gray-200 animate-pulse mr-3"></div>
          </div>
          {/* Situation */}
          <div className="mt-6 md:mt-10 h-5 w-36 rounded-sm bg-gray-200 animate-pulse mb-2"></div>
          {/* title */}
          <div className="h-8 w-80 rounded-sm bg-gray-200 animate-pulse mb-6"></div>
          {/* Input */}
          <div className="h-10 w-full rounded-sm bg-gray-200 animate-pulse mb-4"></div>
          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <div className="h-8 w-20 rounded-sm bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-20 rounded-sm bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-12 rounded-sm bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SkeletonWritingBox;
