class Blockchain {

    constructor() {
      this.count = 1;
      this.add_block();
    }

    get_count() {
      return this.count;
    }
    get_header(){
        return '<div class="block-edit"><h2>Block ' + this.get_count() + '</h1>';
    }
    get_name(){
        return '<label for="name"> Name: </label><input id="setName-' + this.get_count() + '" type="text" placeholder="Enter your name" required>';
    }
    get_data(){
        return '<label for="data"> Transaction Data: </label><input id="setData-' + this.get_count() + '" type="text" placeholder="Enter your data" required>';
    }
    get_form(){
        return '<form id="form-' + this.get_count() + '">' + this.get_name() + this.get_data()  + '</form>';
    }
    get_html(){
        return '<div class="block">' + this.get_header() + this.get_form() + '</div>'
    }

    disable_entry(element) {
        var element = document.getElementById(element);
        element.disabled = true;
        element.style.backgroundColor = "#dddad9";
        // element.placeholder = "";
    }

    disable_block(element) {
        $(element).addClass("block-disable");
    }

    disable_previous(){
        if (this.get_count() != 1){
            var count = this.get_count() - 1
            this.disable_entry("setName-" + count)
            this.disable_entry("setData-" + count)
            this.disable_block(".block-edit")
        }
    }

    add_block(){
        $(".blockchain").append(this.get_header() + this.get_form());
        this.count++;
        console.log("Block #" + (this.get_count() - 1) + " Added")
    }
  }
