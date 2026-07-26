const App = {
  init() {
    Background.init();
    Meteor.init();
    Navigation.init();
    Typing.init();
    Journey.init();
    TerminalExperience.init();
  },
};

window.addEventListener("DOMContentLoaded", () => {
  App.init();
});
