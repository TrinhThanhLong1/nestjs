import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// ko dungfa
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { }