/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if(response.success) {
        const createModal =  App.getModal('createAccount');
        createModal.close();
        App.update();
        this.element.reset();
      } else {
        alert(response.error);
      }
    });
  }
}