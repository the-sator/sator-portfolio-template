import { SiteUser } from "./site-user.type";
import { Session } from "./base.type";

export type SiteUserSession = {
  user: SiteUser;
  session: Session;
};
