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
  take,
  tap,
  throwError,
} from "rxjs";
import { useHttp } from "utils";
import { apiConfig } from "../../config/api";

type AuthContextType = {
  loginValidation: LoginValidationType;
  login: () => Observable<LoginResponse>;
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

type LoginResponse = {
  code: number;           // SaResult 状态码
  msg: string;            // 返回消息
  token: string;          // JWT token
  userId: string;         // 用户ID (必需)
  username: string;       // 用户名 (必需)
  role: string;           // 用户角色 (新增)
  sessionInfo?: any;      // 会话信息 (可选)
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

  useEffect(() => {
    const subscription = combineLatest([
      usernameValid$,
      passwordValid$,
    ]).subscribe({
      next: ([a, b]) => {
        setLoginValidation({
          usernameValid: a,
          passwordValid: b,
          formValid: a && b,
        });
      },
    });

    return () => subscription.unsubscribe();
  }, [username$, password$]);

  const http = useHttp();
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    error: null,
    isAuthed: false,
  });

  const login = (): Observable<LoginResponse> => {
    if (!loginValidation.formValid) {
      return throwError(() => "登录验证未通过");
    }

    if (!http) {
      return throwError(() => "HTTP client is not available");
    }

    const handleLoginError = (error: string): AuthError => {
      return {
        message: error,
        code: 400,
      };
    };

    const url = apiConfig.getChatManageUrl("/user/login");
    return combineLatest([username$, password$]).pipe(
      take(1), // Only take current values, prevent continuous subscription
      tap(() =>
        setAuthState((pre) => ({ ...pre, loading: true, error: null }))
      ),
      switchMap(([username, password]) => {
        const postBody = {
          username: username.trim(),
          password: password,
        };
        return http.post<LoginResponse>(url, postBody);
      }),
      tap((response) => {
        // 检查响应状态码
        if (response.code === 200) {
          localStorage.setItem("token", response.token);
          setAuthState((pre) => ({
            ...pre,
            loading: false,
            isAuthed: true,
          }));
        } else {
          throw new Error(response.msg || "登录失败");
        }
      }),
      catchError((error) => {
        const loginError = handleLoginError(error.message || error);
        setAuthState((pre) => ({
          ...pre,
          loading: false,
          error: loginError,
        }));
        return throwError(() => loginError);
      })
    );
  };

  const register = () => {};

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
