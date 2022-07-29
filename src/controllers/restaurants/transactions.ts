import { Request, Response, NextFunction } from 'express';

import AppDataSource from 'database/AppDataSource';
import Transaction from 'database/entities/Transactions';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const transactions = async (req: Request, res: Response, next: NextFunction) => {
  const transactionRepository = AppDataSource.getRepository(Transaction);
  try {
    const transactions = await transactionRepository.find({
      select: ['id', 'search', 'createdBy', 'created_at'],
    });
    res.customSuccess(200, 'List of transactions.', transactions);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of transactions.`, null, err);
    return next(customError);
  }
};
