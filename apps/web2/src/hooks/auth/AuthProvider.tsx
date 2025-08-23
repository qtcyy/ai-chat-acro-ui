import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
} from "rxjs";

type AuthContextType = {
  loginValidation: LoginValidationType;
  login: () => Observable<any>;
  updateUsername: (username: string) => void;
  updatePassword: (password: string) => void;
};

type AuthProviderProps = {
  children: ReactNode;
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

  const login = (): Observable<any> => {};

  const contextValue = {
    loginValidation,
    login,
    updateUsername,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
