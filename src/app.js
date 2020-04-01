App = {
    loading: false,
    contracts: {},
    blockchain : new Blockchain(),

    load: async() => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async() => {
        
        // If no injected web3 instance is detected, fallback to Ganache.
        App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:8545');
        web3 = new Web3(App.web3Provider);
        web3.eth.defaultAccount = web3.eth.accounts[0];
        console.log('Using Ganache.');
        
    },
    loadAccount: async() => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]
    },
    loadContract: async() => {
        // Create a JavaScript version of the smart contract
        const Simple = await $.getJSON('Simple.json');
        console.log(Simple);
        App.contracts.Simple = TruffleContract(Simple);
        console.log(App.contracts.Simple);
        App.contracts.Simple.setProvider(App.web3Provider);

        // Hydrate the smart contract with values from the blockchain
        App.Simple = await App.contracts.Simple.deployed();
    },
    getvalue: async() => {
        var value = await App.Simple.get();
        $('#getValue').html(value);
        console.log("Successfully retrieved value");
    },
    setValue: async() => {

        var count = App.blockchain.get_count() - 1;
        if (!$('#setName-' + count).val() || !$('#setData-' + count).val()){
            return;
        }
        App.blockchain.disable_previous();
        App.blockchain.add_block();
        await App.Simple.set($('#setName-' + count).val(), $('#setData-' + count).val());
    },
}

$(() => {

    $(window).on('load', function(){ 
        App.load();
    });
})
