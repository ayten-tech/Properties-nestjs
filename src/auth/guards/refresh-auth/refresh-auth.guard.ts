import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
//refresh-jwt is the name of the strategy we just decalred in refresh.strategy.ts
export class RefreshAuthGuard extends AuthGuard("refresh-jwt") { } 

