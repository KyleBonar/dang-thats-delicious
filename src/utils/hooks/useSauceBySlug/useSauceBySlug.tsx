import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSauceBySlug } from "../../../redux/sauces/actions";
import { AppState } from "../../../redux/configureStore";
import { ISauce } from "../../../redux/sauces/types";
import { FlashMessageProps } from "../../../components/FlashMessage/FlashMessage";
import { useRouter } from "next/router";

export interface IuseSauceBySlug {
  loading: boolean;
  sauce?: ISauce;
  error: FlashMessageProps;
  getTheSauce: () => Promise<void>;
}

export function useSauceBySlug(slug?: string): IuseSauceBySlug {
  // init defaults
  const _defaultIsLoading = false;
  const _defaultSauce = undefined;
  const _defaultFlashState = { isVisible: false };
  const _defaultErrorMsg =
    "Could not find a sauce corresponding to this page. Please refresh and try again.";

  // get sauces from redux store
  const {
    sauces: { bySlug, allSlugs }
  } = useSelector((state: AppState) => state);
  // assign sauce
  const [sauce, setSauce] = React.useState<ISauce | undefined>(_defaultSauce);
  // assign loading
  const [loading, setLoading] = React.useState(_defaultIsLoading);
  const [error, setError] = React.useState<FlashMessageProps>(
    _defaultFlashState
  );

  // assign dispatch
  const dispatch = useDispatch();
  // assign router
  const router = useRouter();

  // define function
  const getTheSauce = async () => {
    // Prevent calling multiple times if loading
    if (loading) return;

    try {
      setLoading(true);

      // use specific slug if passed else look at URL
      const s = slug ? slug : router.query?.s;
      if (!s || Array.isArray(s)) {
        return;
      }

      // Quick check to see if we can save an action dispatch
      if (bySlug && bySlug[s] && bySlug[s]._full) {
        setSauce(bySlug[s]);
      } else {
        // Go look for sauces
        dispatch(getSauceBySlug({ slug: s }));
      }
    } catch (err) {
      setError({
        type: "warning",
        isVisible: true,
        text: err?.response?.data?.msg || _defaultErrorMsg
      });
    } finally {
      // finish loading
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // We only want to set the sauce if we have the FULL sauce

    // 1) Use specific slug if passed else look at URL
    const s = slug ? slug : router.query?.s;
    if (!s || Array.isArray(s)) return;

    // 2) Verify we have sauce objects from redux
    if (!bySlug || Object.keys(bySlug).length === 0) return;

    // 3) Find the sauce
    const sauceWeWant = bySlug[s];

    // 4) Make sure sauce is good
    if (
      !sauceWeWant ||
      Object.keys(sauceWeWant).length === 0 ||
      !sauceWeWant._full
    ) {
      // Go find sauce
      console.log("here?");
      getTheSauce();
      return;
    }

    // 5) Set the sauce
    setSauce(sauceWeWant);
  }, [allSlugs, router.asPath]);

  return { loading, sauce, getTheSauce, error };
}
