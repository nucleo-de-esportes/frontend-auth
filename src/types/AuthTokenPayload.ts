export interface AuthTokenPayload {
  sub: string;           // User ID
  email: string;
  exp: number;          // Expiration timestamp
  iat: number;          // Issued at timestamp
  aud: string;
  role: string;
  user_metadata: {
    email: string;
    email_verified: boolean;
    nome: string;
    phone_verified: boolean;
    sub: string;
    user_type: "aluno" | "professor" | "admin";
  };
}
