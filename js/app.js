const App = {

    init(){

        Background.init();

        Navigation.init();

        Typing.init();

    }

};

window.addEventListener("DOMContentLoaded", () => {

    App.init();

});