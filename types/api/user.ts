// API types for user endpoints

import { User } from '../common';

export interface ChangePasswordRequest {
    password: string;
    newPassword: string;
}

export type ChangePasswordResponse = string; // Assuming API returns a success message string

export type UserProfileResponse = User;

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    token: string;
    // Add more fields if your API returns them
}

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
}

export interface SignUpResponse {
    token: string;
    // Add more fields if your API returns them
} 