import styled from "styled-components";

export const CollectionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  h1 {
    font-size: 28px;
    margin-bottom: 25px;
  }

  a:hover {
    opacity: 0.5;
  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
