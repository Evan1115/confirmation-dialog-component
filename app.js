const message = document.querySelector(".message");
const button_1 = document.querySelector("#button-1");
const button_2 = document.querySelector("#button-2");

const handleEventListener = (modal, button) => {
    button.addEventListener("click", () => {
      modal.visible = true;
    });
  };