pragma solidity ^0.5.0;

contract Simple{
    string public name ="name";
    string public data ="data";

    function get() public view returns(string memory){
        return string(abi.encodePacked(name, " ", data));
    }

    function set(string memory _name, string memory _data) public{
        name = _name;
        data = _data;
    }
}
