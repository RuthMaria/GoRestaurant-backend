import { Router } from 'express';
import { getCustomRepository } from 'typeorm'

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import CreateCategoryService from '../services/CreateCategoryService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository)
  
  const transactions = await transactionsRepository.find()
  const balance = await transactionsRepository.getBalance()
  
  return response.json(
    {
      transactions, 
      balance
    })
});

transactionsRouter.post('/', async (request, response) => {
  
  const { title, value, type, category } = request.body

  const createCategory = new CreateCategoryService()

  const { id } = await createCategory.execute(category)

  const createTransaction = new CreateTransactionService()

  const transaction = await createTransaction.execute({
    title,
    type,
    value,
    category_id: id
  })

  return response.json(transaction)

});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
