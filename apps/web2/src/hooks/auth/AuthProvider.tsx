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
import { HttpLoading, useHttp } from "utils";
import { apiConfig } from "../../config/api";

type AuthContextType = {
  loginValidation: LoginValidationType;
  login: () => Observable<LoginResponse>;
  logout: () => Observable<BaseResponseType>;
  authState: AuthState;
  updateUsername: (username: string) => void;
  updatePassword: (password: string) => void;
};

type BaseResponseType = {
  msg: string;
  code: number;
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
  username: string | null;
  role: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

type LoginValidationType = {
  usernameValid: boolean;
  passwordValid: boolean;
  formValid: boolean;
};

type LoginResponse = BaseResponseType & {
  token: string; // JWT token
  userId: string; // 用户ID (必需)
  username: string; // 用户名 (必需)
  role: string; // 用户角色 (新增)
  sessionInfo?: any; // 会话信息 (可选)
};

type CheckLoginResponse = BaseResponseType & {
  token: string;
  userId: string;
  username: string;
  role: string;
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
  const { loadingOperator } = HttpLoading();
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    error: null,
    isAuthed: false,
    username: null,
    role: null,
  });

  const checkLogin = (): Observable<CheckLoginResponse> => {
    if (!http) {
      return throwError(() => "Http not init");
    }
    const url = apiConfig.getChatManageUrl("/user/checkLogin");
    return http.get<CheckLoginResponse>(url).pipe(loadingOperator);
  };

  useEffect(() => {
    const subscription = checkLogin().subscribe({
      next: (value) => {
        console.log(value);
        if (value.code === 200 && value.msg === "success") {
          setAuthState((pre) => ({
            ...pre,
            isAuthed: true,
            role: value.role,
            username: value.username,
          }));
        } else {
          setAuthState((pre) => ({
            ...pre,
            isAuthed: false,
          }));
        }
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (): Observable<LoginResponse> => {
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
            username: response.username,
            role: response.role,
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

  const logout = (): Observable<BaseResponseType> => {
    if (!http) {
      return throwError(() => "Http not init");
    }
    const url = apiConfig.getChatManageUrl("/user/logout");
    return http.post<BaseResponseType>(url).pipe(
      tap(),
      loadingOperator,
      tap((response) => {
        if (response.code === 200 && response.msg === "success") {
          setAuthState((pre) => ({
            ...pre,
            isAuthed: false,
            username: null,
            role: null,
          }));
          localStorage.removeItem("token");
        } else {
          throw new Error(response.msg || "注销错误");
        }
      }),
      catchError((err) => {
        console.warn("注销失败，清除本地token: ", err);
        localStorage.removeItem("token");
        setAuthState((pre) => ({
          ...pre,
          isAuthed: false,
          username: null,
          role: null,
        }));
        return throwError(() => err);
      })
    );
  };

  const contextValue = {
    loginValidation,
    login,
    logout,
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
