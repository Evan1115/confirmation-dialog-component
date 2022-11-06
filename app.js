const modal_1 = document.querySelector("#modal-1");
const modal_2 = document.querySelector("#modal-2");
const message = document.querySelector(".message");
const button_1 = document.querySelector("#button-1");
const button_2 = document.querySelector("#button-2");

const handleEventListener = (modal, button) => {
  modal.addEventListener("cancel", (e) => {
    displayMessage(e.type);
  });

  modal.addEventListener("yes", (e) => {
    displayMessage(e.type);
  });

  button.addEventListener("click", () => {
    modal.visible = true;
  });
};

//display message based on the button clicked
const displayMessage = (type) => {
  switch (type) {
    case "cancel":
      message.innerHTML = 'You just clicked "Cancel" !!';
      break;
    case "yes":
      message.innerHTML = 'You just clicked "Yes" !!';
      break;
    default:
      message.innerHTML = "";
  }
};

//handle event for modal 1 and button 1
handleEventListener(modal_1, button_1);

//handle event for modal 2 and button 2
handleEventListener(modal_2, button_2);
