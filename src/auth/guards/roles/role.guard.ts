import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
//Reflector: a special class that reads meta data attached to routes, controllers, or methods.
//in this case the meta data contain roles required for the route handler (controller method)
//it is injected in constructor so it can be used in custom decorator@Roles
  constructor(private reflector: Reflector) {}
  //canActivate method is called by NestJS to check if the request can proceed
  //it returns true if the request can proceed, false otherwise the request is rejected
  canActivate(context: ExecutionContext,): boolean  {
  //The getAllAndOverride method retrieves all roles metadata 
  //that have been defined at both the class (context.getClass()) level ,refers to entire controller itself
  //and method level(context.getHandler()) ,refering to current method in controller @GET.
  //example code:
// @Roles('admin')
// @Controller('admin')
// export class AdminController {
//   @Roles('moderator')
//   @Get('admin-data') 
//  }

  const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(),context.getClass()]);

  //if no roles are defined,meaning no roles attached to decorator @Roles() allow access to the route
  if (!requiredRoles) {
    return true; //allow access to route by immedietly returning true
  }
  //gets http request object from the execution context 
  //then acccess user object that is attached to the request
  const user = context.switchToHttp().getRequest().user;
  console.log("user object:",user);
  //requiredRoles array of rules allowed to access this route 
  //.some() iterates through this array and checks:
//“Does any one of these requiredRoles match the user.role?” ['admin','editor']
//if user.role = user access denied ❌ , (hasRequiredRole will be false in the return)
//if user.role = editor or user.role = admin then access allowed ✅ (hasRequiredRole will be true in the return) 
//Note the requiredRoles array values are assigned in the decorator @Roles('admin', 'editor') in controller
  const hasRequiredRole = requiredRoles.some((role) => user.role === role);
  console.log("hasRequiredRole:",hasRequiredRole);
  return hasRequiredRole; //will either be true (allow acccess) or false (deny access)
  }
}
