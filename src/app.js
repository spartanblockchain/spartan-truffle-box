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
        console.log("Ganache");

        App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:8545');
        web3 = new Web3(App.web3Provider);
        // console.log('Non-Ethereum browser detected. Falling back to Ganache. You should consider trying MetaMask!')
        
    },
    loadAccount: async() => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]
    },
    loadContract: async() => {
        // Create a JavaScript version of the smart contract
        const Simple = await $.getJSON('Simple.json')
        App.contracts.Simple = TruffleContract(Simple)
        App.contracts.Simple.setProvider(App.web3Provider)

        // Hydrate the smart contract with values from the blockchain
        App.Simple = await App.contracts.Simple.deployed()
    },
    getvalue: async() => {
        var value = await App.Simple.get()
        $('#getValue').html(value)
        console.log("Successfully retrieved value")
    },
    setValue: async() => {
        // calls set from Simple.sol which sets the contract Simple's attributes of name and data
        var count = App.blockchain.get_count() - 1
        await App.Simple.set($('#setName-' + count).val(), $('#setData-' + count).val())
        App.blockchain.disable_previous()
        App.blockchain.add_block()
    },
}

$(() => {

    $(window).on('load', function(){ 
        App.load()
    });
})
