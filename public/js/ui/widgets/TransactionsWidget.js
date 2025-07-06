/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element) {
      throw new Error('Элемент не может быть пустым');
    }

    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const createIncomeBtn = document.querySelector('.create-income-button');
    const createExpenseBtn = document.querySelector('.create-expense-button');

    createIncomeBtn.addEventListener('click', () => {
      const incomeModal = App.getModal('newIncome');
      incomeModal.open();
    });

    createExpenseBtn.addEventListener('click', () => {
      const expenseModal = App.getModal('newExpense');
      expenseModal.open();
    })
  }
}
