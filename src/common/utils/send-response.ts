import { Response } from 'express';

export function sendResponse(res: Response, statusCode: number, message: string, data?: any) {
  const response = { status: statusCode, message };
  if (data) {
    response['data'] = data;
  }
  res.status(statusCode).json(response);
}
