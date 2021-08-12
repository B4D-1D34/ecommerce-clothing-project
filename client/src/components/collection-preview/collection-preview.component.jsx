import React from "react";
import { Link } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";

import {
  CollectionPreviewContainer,
  PreviewContainer,
} from "./collection-preview.styles";

const CollectionPreview = ({
  title,
  items,
  path,
  routeName,
  ...otherProps
}) => (
  <CollectionPreviewContainer>
    <h1>
      <Link to={`${path}/${routeName}`}>{title.toUpperCase()}</Link>
    </h1>
    <PreviewContainer>
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default CollectionPreview;
