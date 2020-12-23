import * as React from "react";

import List from "../../../List/List";
import { useSelector } from "react-redux";
import { AppState } from "../../../../redux/configureStore";

interface ISauceNewestReviewsProps {}

const SauceNewestReviews: React.FunctionComponent<ISauceNewestReviewsProps> = props => {
  // defaults
  const _loadingTxt = "loading...";
  const _noNewSauces = "Could not find any new sauces!";
  const _title = "Newly Reviewed";

  const sauces = useSelector(
    (store: AppState) => store.sauces.saucesWithNewestReviews
  );

  return (
    <>
      {!sauces || !sauces || sauces.length === 0 ? (
        <p>{_noNewSauces}</p>
      ) : (
        <List
          items={sauces.map((x, ind) => {
            return {
              link: `/sauce/view?s=${x.slug}`,
              text: x.name,
              id: `${ind}-${x.name}`
            };
          })}
          title={_title}
        />
      )}
    </>
  );
};

export default SauceNewestReviews;
