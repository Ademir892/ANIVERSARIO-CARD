const App = {
  init() {
    Background.init();
    Meteor.init();
    Navigation.init();
    Typing.init();
  },
};

window.addEventListener("DOMContentLoaded", () => {
  App.init();
});
