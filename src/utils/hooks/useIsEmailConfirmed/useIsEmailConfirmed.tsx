import React from "react";
import { useSelector } from "react-redux";
import { FlashMessageProps } from "../../components/FlashMessage/FlashMessage";
import { AppState } from "../../redux/configureStore";
import { API } from "../api/API";

export interface IuseIsEmailConfirmed {
  loading: boolean;
  isEmailConfirmed: boolean;
  error: FlashMessageProps;
  getEmailConfirmed: () => Promise<void>;
}

export function useIsEmailConfirmed(): IuseIsEmailConfirmed {
  // init defaults
  const _defaultIsLoading = false;
  const _defaultIsEmailConfirmed = false;
  const _defaultFlashState = { isVisible: false };
  const _defaultErrorMsg =
    "Error confirming whether or not your email has been confirmed. Please ensure network connectivity and try again.";

  // init state
  const [_loading, setLoading] = React.useState(_defaultIsLoading);
  const [_isEmailConfirmed, setIsEmailConfirmed] = React.useState(
    _defaultIsEmailConfirmed
  );
  const [_error, setError] = React.useState<FlashMessageProps>(
    _defaultFlashState
  );

  // Grab token from redux
  const token = useSelector((store: AppState) => store.users?.self?.token);

  const getEmailConfirmed = async function () {
    try {
      setLoading(true);

      // hit our API
      if (token && token.length > 0) {
        const data = { user: { token } };
        const res = await API.user.isEmailConfirmed({ data });

        setIsEmailConfirmed(res.data.isGood);
      } else {
        setIsEmailConfirmed(false);
      }
    } catch (err) {
      setIsEmailConfirmed(false);
      setError({
        type: "warning",
        isVisible: true,
        text: err.response.data.msg || _defaultErrorMsg
      });
    } finally {
      setLoading(false);
    }
  };

  // update anytime token changes
  React.useEffect(() => {
    getEmailConfirmed();
  }, [token]);

  return {
    loading: _loading,
    isEmailConfirmed: _isEmailConfirmed,
    error: _error,
    getEmailConfirmed
  };
}
