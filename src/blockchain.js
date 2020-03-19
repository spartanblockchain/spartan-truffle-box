class Blockchain {

    constructor() {
      this.count = 1;
      this.add_blockchain();
    }

    get_count() {
      return this.count;
    }
    get_header(){
        return '<p>Block ' + this.get_count() + '</h1>';
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

    disable(element) {
        var element = document.getElementById(element);
        element.disabled = true;
        element.style.backgroundColor = "#dddad9";
        element.placeholder = "";
    }

    disable_previous(){
        if (this.get_count() != 1){
            var count = this.get_count() - 1
            this.disable("setName-" + count)
            this.disable("setData-" + count)
        }
    }

    add_blockchain(){
        $(".blockchain").append(this.get_html());
        this.count++;
        console.log("Block #" + (this.get_count() - 1) + " Added")
    }
  }
