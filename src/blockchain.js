class Blockchain {

    constructor() {
      this.count = 1;
      this.add_blockchain();
      console.log("Blockchain instance successfully instantiated")
    }

    get_count() {
      return this.count;
    }

    get_header(){
        return '<h1 class="text-center">Block ' + this.get_count() + '</h1>';
    }

    get_div(){
        return '<div class="block-' + this.get_count()  + '">';
    }
    
    add_blockchain(){
        var html = this.get_div() + this.get_header()
        $(function() {
            // $('#loadContent').load('input.html', function() {
            // alert( "Load was performed." );
            // });
            $.get("input.html", function (data) {
                $(".d-flex").append(html + data + "<div");
            });
        });
        this.count++;
    }
  }
