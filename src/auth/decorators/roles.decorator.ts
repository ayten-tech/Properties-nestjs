//creates custom decorator @Roles() used to attach metadata to the route handler like controller methods
/* Example usage:
@Controller(---)
@Roles('admin') // this is the custom decorator
 @Get()
*/

// The SetMetadata a helper function from nest , let's you attach CUSTOM metadata to the route handler like controllers
import { SetMetadata } from '@nestjs/common';
//This imports the Role enum that we will create — a set of defined roles, like: user & admin
import { Role } from './../enums/role.enum';
//This defines a constant key in one place for reuse 
//You'll use this same key later to read the metadata (e.g. in a guard).
//This key stores metadata in this case metadata contains roles
export const ROLES_KEY = 'roles';
//This defines custom decorator.
//When you use @Roles('admin') or @Roles('user', 'editor'), it calls the SetMetadata function
//SetMetadata('roles', ['admin']); // if you passed 'admin'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);