/**
 * API Configuration Module
 * Provides type-safe access to environment-based backend URLs
 */

// Environment variable interface
interface ApiEnvironment {
  REACT_APP_CHAT_MANAGE_BACKEND?: string;
  REACT_APP_CHATBOT_BACKEND?: string;
}

// Default fallback URLs for development
const DEFAULT_CONFIG = {
  CHAT_MANAGE_BACKEND: 'http://localhost:8082',
  CHATBOT_BACKEND: 'http://localhost:8000',
} as const;

// Get environment variables with fallbacks
function getEnvironmentConfig(): Required<ApiEnvironment> {
  return {
    REACT_APP_CHAT_MANAGE_BACKEND: 
      process.env.REACT_APP_CHAT_MANAGE_BACKEND || DEFAULT_CONFIG.CHAT_MANAGE_BACKEND,
    REACT_APP_CHATBOT_BACKEND: 
      process.env.REACT_APP_CHATBOT_BACKEND || DEFAULT_CONFIG.CHATBOT_BACKEND,
  };
}

// Validate URL format
function validateUrl(url: string, serviceName: string): string {
  try {
    new URL(url);
    return url.replace(/\/$/, ''); // Remove trailing slash
  } catch (error) {
    console.error(`Invalid URL for ${serviceName}: ${url}`);
    throw new Error(`Configuration error: Invalid URL for ${serviceName}`);
  }
}

// API Configuration object
class ApiConfig {
  private readonly config: Required<ApiEnvironment>;

  constructor() {
    this.config = getEnvironmentConfig();
    this.validateConfiguration();
  }

  private validateConfiguration(): void {
    Object.entries(this.config).forEach(([key, value]) => {
      if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    });
  }

  // Service-specific URL getters
  get chatManageBaseUrl(): string {
    return validateUrl(this.config.REACT_APP_CHAT_MANAGE_BACKEND, 'Chat Management');
  }

  get chatbotBaseUrl(): string {
    return validateUrl(this.config.REACT_APP_CHATBOT_BACKEND, 'Chatbot');
  }

  // Utility method to get URL for specific endpoints
  getChatManageUrl(endpoint: string = ''): string {
    const baseUrl = this.chatManageBaseUrl;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${cleanEndpoint}`;
  }

  getChatbotUrl(endpoint: string = ''): string {
    const baseUrl = this.chatbotBaseUrl;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${cleanEndpoint}`;
  }

  // Debug information
  getDebugInfo(): Record<string, string> {
    return {
      chatManageBackend: this.chatManageBaseUrl,
      chatbotBackend: this.chatbotBaseUrl,
      environment: process.env.NODE_ENV || 'development',
    };
  }
}

// Export singleton instance
export const apiConfig = new ApiConfig();

// Export types for TypeScript consumers
export type { ApiEnvironment };

// Development helper
if (process.env.NODE_ENV === 'development') {
  console.info('API Configuration loaded:', apiConfig.getDebugInfo());
}