'use babel';

export default class YoutubeAndChillView {


  constructor(serializedState, controller) {
    this.controller = controller;
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('youtube-and-chill');

    // Create input view element
    const input_view = document.createElement('div');
    input_view.id = "ync-input_view";
    this.element.appendChild(input_view);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    var inp = document.createElement('input');
    inp.classList.add('native-key-bindings');
    inp.placeholder = "Enter YouTube URL";
    inp.id = "ync-url_input";

    var button = document.createElement('button');
    button.addEventListener("click", ()=>{
        var url = document.getElementById("ync-url_input").value;
        this.controller.showVideo(url);
    });
    button.id = "ync-url_submit";
    button.textContent = "Go!";

    this.element.children[0].appendChild(inp);
    this.element.children[0].appendChild(button);
    return this.element;
  }

}
