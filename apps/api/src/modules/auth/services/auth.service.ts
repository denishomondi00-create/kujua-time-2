import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';

interface AuthResult {
  accessToken: string;
  refreshToken: string;
  session: {
    isAuthenticated: boolean;
    user: { id: string; email: string; firstName?: string; lastName?: string; fullName?: string; avatarUrl?: string | null; emailVerifiedAt?: string | null };
    workspace: { id: string; name: string; slug: string; plan?: string } | null;
  };
}

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {
    this.jwtSecret = this.config.get<string>('JWT_SECRET', 'kujua-time-dev-secret');
  }

  async signup(dto: SignupDto): Promise<AuthResult> {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new BadRequestException('An account with this email already exists.');

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const user = await this.usersService.create({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      hashedPassword,
    });

    const workspace = await this.usersService.createDefaultWorkspace(user.id, dto.businessName);
    return this.buildAuthResult(user, workspace);
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid email or password.');

    const valid = await bcrypt.compare(dto.password, user.hashedPassword);
    if (!valid) throw new UnauthorizedException('Invalid email or password.');

    const workspace = await this.usersService.getPrimaryWorkspace(user.id);
    return this.buildAuthResult(user, workspace);
  }

  async logout(refreshToken: string): Promise<void> {
    await this.usersService.revokeRefreshToken(refreshToken);
  }

  async refresh(refreshToken?: string): Promise<AuthResult> {
    if (!refreshToken) throw new UnauthorizedException('No refresh token provided.');

    try {
      const payload = jwt.verify(refreshToken, this.jwtSecret) as jwt.JwtPayload;
      const user = await this.usersService.findById(payload.sub!);
      if (!user) throw new UnauthorizedException('User not found.');
      const workspace = await this.usersService.getPrimaryWorkspace(user.id);
      return this.buildAuthResult(user, workspace);
    } catch {
      throw new UnauthorizedException('Invalid refresh token.');
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return; // Silent — don't reveal account existence
    await this.usersService.createPasswordResetToken(user.id);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const userId = await this.usersService.validatePasswordResetToken(token);
    const hashed = await bcrypt.hash(newPassword, 12);
    await this.usersService.updatePassword(userId, hashed);
  }

  async verifyEmail(token: string): Promise<void> {
    await this.usersService.verifyEmailToken(token);
  }

  async getSession(accessToken?: string) {
    if (!accessToken) return { isAuthenticated: false, user: null, workspace: null };

    try {
      const payload = jwt.verify(accessToken, this.jwtSecret) as jwt.JwtPayload;
      const user = await this.usersService.findById(payload.sub!);
      if (!user) return { isAuthenticated: false, user: null, workspace: null };
      const workspace = await this.usersService.getPrimaryWorkspace(user.id);
      return {
        isAuthenticated: true,
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, fullName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(), avatarUrl: user.avatarUrl ?? null, emailVerifiedAt: user.emailVerifiedAt ?? null },
        workspace: workspace ? { id: workspace.id, name: workspace.name, slug: workspace.slug, plan: workspace.plan } : null,
      };
    } catch {
      return { isAuthenticated: false, user: null, workspace: null };
    }
  }

  private buildAuthResult(user: any, workspace: any): AuthResult {
    const accessToken = jwt.sign({ sub: user.id, email: user.email, workspaceId: workspace?.id }, this.jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: user.id, type: 'refresh' }, this.jwtSecret, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      session: {
        isAuthenticated: true,
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, fullName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(), avatarUrl: user.avatarUrl ?? null, emailVerifiedAt: user.emailVerifiedAt ?? null },
        workspace: workspace ? { id: workspace.id, name: workspace.name, slug: workspace.slug, plan: workspace.plan } : null,
      },
    };
  }
}
