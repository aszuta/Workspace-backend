const Config: Record<string, any> = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8000,
  apiPrefix: process.env.API_PREFIX,
};

export default Config;
