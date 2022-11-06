class Modal extends HTMLElement {
  get visible() {
    return this.hasAttribute("visible");
  }

  set visible(value) {
    if (value) {
      this.setAttribute("visible", value);
    } else {
      this.removeAttribute("visible");
    }
  }

  get title() {
    return this.getAttribute("title");
  }

  set title(value) {
    this.setAttribute("title", value);
  }

  constructor() {
    super();
  }

  //trigger when component is inserted into the DOM.
  connectedCallback() {
    this._render();
    this._attachEventHandlers();
  }

  //to observe the changes on the attribute
  static get observedAttributes() {
    return ["visible", "title"];
  }

  //to react to the changes on the attribute
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title" && this.shadowRoot) {
      this.shadowRoot.querySelector(".modal-header__title").textContent =
        newValue;
    }
    if (name === "visible" && this.shadowRoot) {
      if (newValue === null) {
        this.shadowRoot
          .querySelector(".modal-container")
          .classList.remove("visible");
        this.dispatchEvent(new CustomEvent("close"));
      } else {
        this.shadowRoot
          .querySelector(".modal-container")
          .classList.add("visible");
        this.dispatchEvent(new CustomEvent("open"));
      }
    }
  }

  //render the component content
  _render() {
    console.log("visible:", this.visible);
    const modal_container_class = this.visible
      ? "modal-container visible"
      : "modal-container";

    const container = document.createElement("div");
    container.innerHTML = `
            <style>
              @import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");
              .modal-container {
                position: fixed;
                left: 0;
                top: 0;
                height: 100vh;
                width: 100vw;
                background-color: rgba(0, 0, 0, 0.3);
                opacity: 1;
                display: flex;
                align-items: center;
                justify-content: center; 
                pointer-events: none;
                transition: opacity 0.3s ease;
              }
              .visible {
                opacity: 1;
                pointer-events: auto;
              }
              .modal {
                background-color: #fff;
                font-size: 14px;
                width: 600px;
                text-align: left;
                border-radius: 5px;
  
                /* make sure wont overflow  */
                max-width: 100%;
  
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              }
              .modal-content{
                padding: 10px 50px;
                opacity:0.8;
                font-size: 14px;
                line-height: 20px;
              }
              .modal-header {
                position: relative;
                padding: 10px 50px;
              }
              .modal-header__close {
                color: black;
                font-size: 30px;
                margin-right: 15px;
                margin-top:10px;
                position: absolute;
                top: 0;
                right: 0;
                cursor: pointer;
              }
              .modal-header__close:hover {
                color: gainsboro;
              }
              .modal-header__title {
                font-size: 18px;
              }
              button {
                border: 0;
                background-color: #47a386;
                border-radius: 5px;
                color: #fff;
                padding: 10px 25px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              }
              button:hover {
                background-color: #49927b;
              }
              .modal-footer{
                padding: 20px 0;
                text-align: center;
              }
            </style>
            <div class='${modal_container_class}'>
              <div class='modal'>
                <!-- modal header -->
                <div class="modal-header">
                  <h1 class='modal-header__title'>${this.title}</h1>
                  <div class="modal-header__close">&times;</div>
                </div>  
  
                <!-- modal content -->
                <div class='modal-content'>
                  <slot></slot>
                </div>
  
                <!-- modal footer -->
                <div class='modal-footer'>
                <button class='modal-footer__yes'>Yes</button>
                  <button class='modal-footer__cancel'>Cancel</button>
                </div>
  
              </div>
            </div>`;

    //to enable the access to shadowRoot
    const shadowRoot = this.attachShadow({ mode: "open" });

    //attach the child to the shadowroot
    shadowRoot.appendChild(container);
  }

  //event listener
  _attachEventHandlers() {
    const cancelButton = this.shadowRoot.querySelector(".modal-footer__cancel");
    const exitButton = this.shadowRoot.querySelector(".modal-header__close");
    const yesButton = this.shadowRoot.querySelector(".modal-footer__yes");

    cancelButton.addEventListener("click", (e) => {
      this.publishEvent("cancel");
    });

    exitButton.addEventListener("click", (e) => {
      this.publishEvent("cancel");
    });

    yesButton.addEventListener("click", (e) => {
      this.publishEvent("yes");
    });

    window.addEventListener("click", (e) => {
      if (e.target.tagName == "MODAL-COMPONENT") {
        this.publishEvent("outsideClick");
      }
    });
  }

  //publish event to the outside of the component
  publishEvent(name) {
    this.dispatchEvent(new CustomEvent(name));
    this.removeAttribute("visible");
  }
}

//define component nanme
window.customElements.define("modal-component", Modal);
