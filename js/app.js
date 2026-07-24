const App = {
  init() {
    Background.init();
    Meteor.init();
    Navigation.init();
    Typing.init();
    Journey.init();
  },
};

window.addEventListener("DOMContentLoaded", () => {
  App.init();
});
