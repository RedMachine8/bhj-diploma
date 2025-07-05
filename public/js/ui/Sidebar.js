/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const elemBody = document.querySelector('body');
    const sidebarButton = document.querySelector('.sidebar-toggle');

    sidebarButton.addEventListener('click', (e) => {
      e.preventDefault();

      if(elemBody.classList.contains('sidebar-open') && elemBody.classList.contains('sidebar-collapse')) {
        elemBody.classList.remove('sidebar-open');
        elemBody.classList.remove('sidebar-collapse');
      } else {
        elemBody.classList.add('sidebar-open');
        elemBody.classList.add('sidebar-collapse');
      }
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const loginBtn = document.querySelector('.menu-item_login');
    const registrBtn = document.querySelector('.menu-item_register');
    const logOutBtn = document.querySelector('.menu-item_logout'); 
    if(loginBtn) {
      loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const loginModal = App.getModal('login');
        loginModal.open();
      });
    }

    if(registrBtn) {
      registrBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const registModal = App.getModal('register');
        registModal.open();
      });
    }

    if(logOutBtn) {
      logOutBtn.addEventListener('click', (e) => {
        User.logout((err, response) => {
          if(response.success) {
            User.unsetCurrent();
          } else {
            throw new Error(err);
          }
        }); 
      });
    }
  }
}