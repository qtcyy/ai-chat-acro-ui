import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
} from "rxjs";
import { useHttp } from "utils";
import { apiConfig } from "../../config/api";

type AuthContextType = {
  loginValidation: LoginValidationType;
  login: <T>() => Observable<T>;
  authState: AuthState;
  updateUsername: (username: string) => void;
  updatePassword: (password: string) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthError = {
  message: string;
  code: number;
};

type AuthState = {
  loading: boolean;
  error: AuthError | null;
  isAuthed: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

type LoginValidationType = {
  usernameValid: boolean;
  passwordValid: boolean;
  formValid: boolean;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const [loginValidation, setLoginValidation] = useState<LoginValidationType>({
    usernameValid: true,
    passwordValid: true,
    formValid: false,
  });

  const [username$] = useState(() => new BehaviorSubject(""));
  const [password$] = useState(() => new BehaviorSubject(""));

  const updateUsername = (username: string) => username$.next(username);

  const updatePassword = (password: string) => password$.next(password);

  const usernameValid$ = username$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map((value) => {
      if (!value || !value.trim() || value.trim().length < 6) {
        return false;
      }
      return true;
    })
  );

  const passwordValid$ = password$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map((value) => {
      if (!value || !value.trim() || value.trim().length < 8) {
        return false;
      }
      return true;
    })
  );

  const formValid$ = combineLatest([usernameValid$, passwordValid$]).pipe(
    map(([a, b]) => a && b)
  );

  useEffect(() => {
    const subscription = combineLatest([
      usernameValid$,
      passwordValid$,
      formValid$,
    ]).subscribe({
      next([a, b, c]) {
        setLoginValidation({
          usernameValid: a,
          passwordValid: b,
          formValid: c,
        });
      },
    });

    return () => subscription.unsubscribe();
  }, [username$, password$, formValid$]);

  const http = useHttp();
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    error: null,
    isAuthed: false,
  });

  const login = <T,>(): Observable<T> => {
    if (!loginValidation.formValid) {
      return new Observable<T>();
    }

    const handleLoginError = (error: string): AuthError => {
      return {
        message: error,
        code: 400,
      };
    };

    const url = apiConfig.getChatManageUrl("/user/login");
    return combineLatest([username$, password$]).pipe(
      tap(() =>
        setAuthState((pre) => ({ ...pre, loading: true, error: null }))
      ),
      switchMap(([username, password]) => {
        const postBody = {
          username: username.trim(),
          password: password,
        };
        return http!.post(url, postBody);
      }),
      tap((response) => {
        localStorage.setItem("token", response.token);
        setAuthState((pre) => ({
          ...pre,
          loading: false,
          isAuthed: true,
        }));
      }),
      catchError((error) => {
        const loginError = handleLoginError(error);
        setAuthState((pre) => ({
          ...pre,
          loading: false,
          error: loginError,
        }));
        return throwError(() => loginError);
      })
    );
  };

  const contextValue = {
    loginValidation,
    login,
    authState,
    updateUsername,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
