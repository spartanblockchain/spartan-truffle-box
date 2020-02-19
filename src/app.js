App = {
    loading: false,
    contracts: {},

    load: async() => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async() => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                    // Acccounts now exposed
                web3.eth.sendTransaction({ /* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        /* Legacy dapp browsers... Is there is an injected web3 instance?
        Before diving in, we'll need to make sure the dapp is checking 
        for MetaMask's web3 instance and that the extension itself is 
        configured properly with Ganache.
        */
        else if (window.web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
                // Acccounts always exposed
            web3.eth.sendTransaction({ /* ... */ })
        }
        // Non-dapp browsers...
        else {
            // If no injected web3 instance is detected, fallback to Ganache.
            App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
            web3 = new Web3(App.web3Provider);
            console.log('Non-Ethereum browser detected. Falling back to Ganache. You should consider trying MetaMask!')
        }
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
        await App.Simple.set($('#setName').val(), $('#setData').val())
        console.log("Successfully set value")
    }

}

$(() => {
    $(window).load(() => {
        App.load()
    })
})