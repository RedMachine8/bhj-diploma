/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountLists = this.element.querySelector('select[name="account_id"]');
    const userActive = User.current();
    if(userActive) {
      Account.list(userActive, (err, response) => {
        if(response.success) {
          if(response.data) {
            accountLists.innerHTML = '';
            response.data.forEach(elem => {
              accountLists.insertAdjacentHTML('beforeend', `
                <option value="${elem.id}">${elem.name}</option>  
              `);
            })
          }
        } else {
          throw new Error(response.error);
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(response.success) {
        this.element.reset();
        const elemHead = this.element.closest('.modal');
        App.getModal(elemHead.dataset.modalId).close();
        App.update();
      }
    });
  }
}