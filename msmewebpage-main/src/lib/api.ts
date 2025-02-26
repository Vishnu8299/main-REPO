import axios, { AxiosError, AxiosInstance, AxiosResponse, AxiosHeaders } from 'axios';
import {
  User,
  Project,
  Hackathon,
  ApiResponse,
  UserUpdateData,
  ProjectCreateData,
  ProjectUpdateData,
  HackathonCreateData,
  HackathonUpdateData,
  UserRole,
  LoginResponse,
  ErrorResponse,
} from '../types';

class Api {
  private instance: AxiosInstance;
  private BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

  constructor() {
    this.instance = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // Add 30s timeout
      withCredentials: true, // Enable credentials for CORS
    });

    // Add request interceptor to include JWT token
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle errors
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        } else if (error.response?.status === 403) {
          // Handle forbidden access
          window.location.href = '/forbidden';
        } else if (error.code === 'ECONNABORTED') {
          // Handle timeout
          console.error('Request timeout');
          return Promise.reject(new Error('Request timeout. Please try again.'));
        } else if (!error.response) {
          // Handle network errors
          console.error('Network error');
          return Promise.reject(new Error('Network error. Please check your connection.'));
        }
        return Promise.reject(error);
      }
    );
  }

  private handleError(error: AxiosError<ErrorResponse>): Error {
    console.error('Server Error:', error.response?.data);
    
    if (error.response) {
      const message = error.response.data?.message || 'An unexpected error occurred';
      if (error.response.status === 401) {
        return new Error('Invalid credentials');
      } else if (error.response.status === 403) {
        return new Error('Access denied');
      } else if (error.response.status === 500) {
        return new Error('Server error occurred. Please check server logs.');
      }
      return new Error(message);
    } else if (error.request) {
      return new Error('No response from server. Please check your connection.');
    } else {
      return new Error('Request failed. Please try again.');
    }
  }

  private handleResponse<T>(response: AxiosResponse): T {
    if (!response.data) {
      throw new Error('No data received from server');
    }
    
    // Handle both wrapped and direct response formats
    const data = response.data.data || response.data;
    
    // For authentication endpoints that return token directly
    if (typeof data === 'string' && response.config.url?.includes('/auth/')) {
      return data as T;
    }
    
    return data as T;
  }

  // Auth API
  async login(email: string, password: string, role?: UserRole): Promise<LoginResponse> {
    try {
      console.log('Sending login request:', { email, password: '[REDACTED]', role });
      
      const response = await this.instance.post<ApiResponse<any>>('/auth/login', {
        email,
        password,
        role: role?.toUpperCase()
      });

      console.log('Raw login response:', response.data);

      const { data } = response.data;
      if (!data) {
        throw new Error('Invalid response format from server');
      }

      // Construct user object from response data
      const user: User = {
        id: data.userId,
        email: email,
        name: data.name,
        role: data.role as UserRole,
        active: true,
        organization: '',
        phoneNumber: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Store the token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(user));
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      return {
        token: data.token,
        user
      };
    } catch (error) {
      console.error('Login Error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
    organization?: string;
    phoneNumber?: string;
  }): Promise<LoginResponse> {
    try {
      const response = await this.instance.post<ApiResponse<any>>('/auth/register', {
        ...userData,
        role: userData.role?.toUpperCase()
      });

      if (!response.data || response.data.status === 'error') {
        throw new Error(response.data?.message || 'Registration failed');
      }

      const { data } = response.data;
      if (!data) {
        throw new Error('Invalid response format: missing data');
      }

      // Construct user object from response data
      const user: User = {
        id: data.userId,
        email: userData.email,
        name: data.name || userData.name,
        role: data.role as UserRole,
        organization: userData.organization || '',
        phoneNumber: userData.phoneNumber || '',
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Store the token and update headers
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(user));
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      return {
        token: data.token,
        user
      };
    } catch (error) {
      console.error('Registration Error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.instance.post('/api/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete this.instance.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Logout Error:', error);
      // Still clear local storage even if the API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete this.instance.defaults.headers.common['Authorization'];
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  // User API
  async getCurrentUser(): Promise<User> {
    try {
      const response = await this.instance.get<ApiResponse<User>>('/api/auth/current-user');
      return this.handleResponse(response);
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async updateProfile(userData: UserUpdateData): Promise<User> {
    const response = await this.instance.put<ApiResponse<User>>('/api/users/me', userData);
    return this.handleResponse(response);
  }

  // Project API
  async getAllProjects(): Promise<Project[]> {
    try {
      const response = await this.instance.get<ApiResponse<Project[]>>('/api/projects');
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async getDeveloperProjects(userId: string): Promise<Project[]> {
    try {
      const response = await this.instance.get<ApiResponse<Project[]>>(`/api/projects/developer/${userId}`);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async searchProjects(technologies?: string[], status?: string): Promise<Project[]> {
    try {
      const params = new URLSearchParams();
      if (technologies) {
        technologies.forEach(tech => params.append('technologies', tech));
      }
      if (status) {
        params.append('status', status);
      }
      const response = await this.instance.get<ApiResponse<Project[]>>(`/api/projects/search?${params.toString()}`);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async createProject(projectData: ProjectCreateData): Promise<Project> {
    const response = await this.instance.post<ApiResponse<Project>>('/api/projects', projectData);
    return this.handleResponse(response);
  }

  async updateProject(id: string, projectData: ProjectUpdateData): Promise<Project> {
    const response = await this.instance.put<ApiResponse<Project>>(`/api/projects/${id}`, projectData);
    return this.handleResponse(response);
  }

  async deleteProject(id: string): Promise<void> {
    await this.instance.delete(`/api/projects/${id}`);
  }

  async getUserProjects(userId: string): Promise<Project[]> {
    const response = await this.instance.get<ApiResponse<Project[]>>(`/api/users/${userId}/projects`);
    return this.handleResponse(response);
  }

  // Admin API
  async getAllUsers(): Promise<User[]> {
    const response = await this.instance.get<ApiResponse<User[]>>('/api/admin/users');
    return this.handleResponse(response);
  }

  async getStats(): Promise<any> {
    const response = await this.instance.get<ApiResponse<any>>('/api/admin/stats');
    return this.handleResponse(response);
  }

  async updateUserStatus(userId: string, status: boolean): Promise<User> {
    const response = await this.instance.patch<ApiResponse<User>>(`/api/admin/users/${userId}/status`, { status });
    return this.handleResponse(response);
  }

  async createHackathon(hackathonData: HackathonCreateData): Promise<Hackathon> {
    const response = await this.instance.post<ApiResponse<Hackathon>>('/api/admin/hackathons', hackathonData);
    return this.handleResponse(response);
  }

  async getAllHackathons(): Promise<Hackathon[]> {
    const response = await this.instance.get<ApiResponse<Hackathon[]>>('/api/hackathons');
    return this.handleResponse(response);
  }

  async updateHackathon(id: string, hackathonData: HackathonUpdateData): Promise<Hackathon> {
    const response = await this.instance.put<ApiResponse<Hackathon>>(`/api/admin/hackathons/${id}`, hackathonData);
    return this.handleResponse(response);
  }

  async deleteHackathon(id: string): Promise<void> {
    await this.instance.delete(`/api/admin/hackathons/${id}`);
  }

  // Generic HTTP methods
  async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.instance.post<T>(url, data);
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.instance.put<T>(url, data);
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.instance.delete<T>(url);
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async signUp(data: { 
    name: string; 
    email: string; 
    password: string; 
    role: UserRole; 
    companyName?: string;
    phoneNumber?: string;
  }): Promise<{ token: string; user: User }> {
    try {
      const response = await this.instance.post<ApiResponse<any>>('/auth/register', {
        ...data,
        role: data.role?.toUpperCase(),
        organization: data.companyName // Map companyName to organization for backend
      });

      if (!response.data || response.data.status === 'error') {
        throw new Error(response.data?.message || 'Registration failed');
      }

      const { data: responseData } = response.data;
      
      // Construct user object from response data
      const user: User = {
        id: responseData.userId,
        email: data.email,
        name: data.name,
        role: responseData.role as UserRole,
        organization: data.companyName || '',
        phoneNumber: data.phoneNumber || '',
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Store the token and update headers
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${responseData.token}`;

      return {
        token: responseData.token,
        user
      };
    } catch (error) {
      console.error('SignUp Error:', error);
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }
}

export const api = new Api();
