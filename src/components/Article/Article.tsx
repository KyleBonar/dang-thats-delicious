import * as React from "react";

import styled from "../../theme/styled-components";

const StyledArticle = styled.article`
  max-width: 900px;
  margin: 0 auto;

  > div {
    margin-bottom: 3.5rem;
  }
`;

interface ArticleProps {
  children: Element | JSX.Element | Array<Element | JSX.Element>;
}

const Article: React.SFC<ArticleProps> = props => {
  return <StyledArticle>{props.children}</StyledArticle>;
};

export default Article;
