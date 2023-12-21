import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticateResponse } from "../shared/models/authenticate";
import { ApiResponse } from "../shared/models/apiresponse";
import { CookieService } from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private router:Router,
     private jwtHelper: JwtHelperService,
     private http: HttpClient,
     private cookiService: CookieService){}
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const accessToken = this.cookiService.get("accessToken");

    if (accessToken && !this.jwtHelper.isTokenExpired(accessToken)){
      console.log(this.jwtHelper.decodeToken(accessToken))
      return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(accessToken); 
    if (!isRefreshSuccess) { 
      this.router.navigate(["login"]); 
    }

    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string|null): Promise<boolean> {

    const refreshToken = this.cookiService.get("refreshToken");
    if (!token || !refreshToken) { 
      return false;
    }
    
    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
    let isRefreshSuccess: boolean;

    const refreshRes = await new Promise<ApiResponse<AuthenticateResponse>>((resolve, reject) => {
      this.http.post<ApiResponse<AuthenticateResponse>>("https://localhost:7234/api/Authenticate/refresh-token", credentials).subscribe({
        next: (res: ApiResponse<AuthenticateResponse>) => resolve(res),
        error: (_) => { reject; isRefreshSuccess = false;}
      });
    });

    this.cookiService.set("accessToken", refreshRes.data.accessToken);
    this.cookiService.set("refreshToken", refreshRes.data.refreshToken);
    isRefreshSuccess = true;

    return isRefreshSuccess;
  }
}