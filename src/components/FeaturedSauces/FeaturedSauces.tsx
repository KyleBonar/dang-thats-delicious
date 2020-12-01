import React from "react";

import SectionTitle from "../SectionTitle/SectionTitle";
import { useFeaturedSauces } from "../../utils/hooks/useFeaturedSauces/useFeaturedSauces";

import {
  StyledDiv,
  StyledCard,
  StyledCardHolder,
  StyledCardContainer
} from "./FeaturedSaucesStyles";

interface FeaturedSaucesProps {
  className?: string;
}

const FeaturedSauces: React.FC<FeaturedSaucesProps> = props => {
  // constants
  const _title = {
    title: "Featured Sauces",
    description:
      "Check out some of these unique sauces. Discover flavors you've never tasted before!"
  };
  const _loadingText = "Loading...";
  const _noSaucesFoundText = "No sauces found...";

  // Get featured sauces from hook
  const { sauces, loading, error, getFeaturedSauces } = useFeaturedSauces();

  React.useEffect(() => {
    if (!loading && sauces.length === 0) getFeaturedSauces();
  }, []);

  return (
    <StyledDiv className={props.className}>
      <SectionTitle {..._title} />
      <StyledCardContainer data-testid="cardsContainer">
        {renderContent()}
      </StyledCardContainer>
    </StyledDiv>
  );

  function renderContent() {
    if (loading) {
      return <p>{_loadingText}</p>;
    }

    if (error.isVisible) {
      return <p>{error.text}</p>;
    }

    if (sauces.length === 0) {
      return <p>{_noSaucesFoundText}</p>;
    }

    return sauces.map((sauce, ind) => {
      return (
        <StyledCardHolder key={ind + "-" + sauce.created}>
          <StyledCard
            title={sauce.name}
            imageLink={`${sauce.photo}`}
            description={sauce.description}
            to={`/sauce/view?s=${sauce.slug}`}
          />
        </StyledCardHolder>
      );
    });
  }
};

export default FeaturedSauces;
