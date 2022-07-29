import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

import AppDataSource from 'database/AppDataSource';
import Transaction from 'database/entities/Transactions';
import User from 'database/entities/User';
import { RestaurantsResponse } from 'types/Restaurants';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const search = async (req: Request, res: Response, next: NextFunction) => {
  const { q, at } = req.query;
  const { id } = req.jwtPayload;
  try {
    const { data } = await axios.get<RestaurantsResponse>(
      `https://places.ls.hereapi.com/places/v1/autosuggest?at=${at}&q=${q}&apiKey=${process.env.HERE_API_KEY}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    //Keep the search history
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const userRepository = AppDataSource.getRepository(User);
    const currentUser = await userRepository.findOneBy({ id });
    const newTrx = new Transaction();
    newTrx.search = `at=${at}&q=${q}`;
    newTrx.createdBy = currentUser!;
    await transactionRepository.save(newTrx);

    // Mapping to ignore unnecesary fields
    const result = data.results.map(
      ({
        title,
        highlightedTitle,
        type,
        resultType,
        vicinity,
        highlightedVicinity,
        position,
        category,
        categoryTitle,
        distance,
        chainIds,
        bbox,
      }) => ({
        title,
        highlightedTitle,
        type,
        resultType,
        vicinity,
        highlightedVicinity,
        position,
        category,
        categoryTitle,
        distance,
        chainIds,
        bbox,
      }),
    );

    res.customSuccess(200, 'List of nearby restaurants.', result);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of restaurants.`, null, err);
    return next(customError);
  }
};
