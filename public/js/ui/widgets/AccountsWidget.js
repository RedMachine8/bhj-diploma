/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
      if(!element) {
        throw new Error('Элемент не может быть пустым');
      }

      this.element = element;
      this.update();
      this.registerEvents();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createNewAccount = document.querySelector('.create-account');
    createNewAccount.addEventListener('click', () => {
      const createModal =  App.getModal('createAccount');
      createModal.open();
    }) 

    this.element.addEventListener('click', (e) => {
      if (e.target.closest('.account')) {
          this.onSelectAccount(e.target.closest('.account'));
      }
    });
    /*const account = this.element.querySelectorAll('.account');
    account.forEach(elem => {
      elem.addEventListener('click', () => {
        this.onSelectAccount(elem);
      });
    });*/
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const userActive = User.current();
    if(userActive) {
      Account.list(userActive, (err, response) => {
        if(response.success) {
          this.clear();
          this.renderItem(response.data);
        } else {
          alert(response.error);
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(account => account.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const activeAccounts = this.element.querySelectorAll('.active');
    activeAccounts.forEach(acc => {acc.classList.toggle('active')});

    element.classList.add('active');
    App.showPage('transactions', { account_id: element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span>
          <span>${item.sum}</span>
        </a>
      </li>
    `;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    if(data) {
      data.forEach(elem => {
        this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(elem));
      });
    }
  }
}
