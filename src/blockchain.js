class Blockchain {

    constructor() {
      this.count = 1;
      this.add_blockchain();
    }

    get_count() {
      return this.count;
    }
    get_header(){
        return '<div class="block"><h1>Block ' + this.get_count() + '</h1>';
    }
    get_name(){
        return '<label for="name"> Name: </label><input id="setName-' + this.get_count() + '" type="text" placeholder="Enter your name" required>';
    }
    get_data(){
        return '<label for="data"> Transaction Data: </label><input id="setData-' + this.get_count() + '" type="text" placeholder="Enter your data" required>';
    }
    get_form(){
        return '<form id="form-' + this.get_count() + '">' + this.get_name() + this.get_data()  + '</form></div>';
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
        this.disable_previous()
        $(".blockchain").append(this.get_header() + this.get_form());
        this.count++;
        console.log("Block #" + (this.get_count() - 1) + " Added")
    }
  }
