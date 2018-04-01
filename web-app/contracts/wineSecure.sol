pragma solidity ^0.4.21;

contract wineSecure {
    /* Define variable owner of the type address*/
    address public owner;

    /* Define variables that store Wine details */
    WineCharacteristics public wineCharacteristics;

    /* Define a public event */
    event TransferOwnership(address owner, string message);
    event CharacteristicsSet(string message, string setting);

    /* Collection of shareHolders */
    SupplyChain[] public supplyChain;

    /* data structure to hold information on supply chain */
    struct SupplyChain {
        address source;
    }

    /* data structure to hold information on wine */
    struct WineCharacteristics {
        string grapeVariety;
        string colour;
        uint alcoholLevel;
//        string pressing;
//        string Fermentation;
//        string additives;
        string acidLevel;
        string phenolicContent;
        uint sugarLevel;
        string minerals;
        uint co2;
    }

    /* Function to delete all information on the contract */
    function kill() public { 
        if (msg.sender == owner) 
            selfdestruct(owner); 
    }

    /* this runs when the contract is created  */
    function wineSecure() public {
        // set the owner to be the creator of the contract
        owner = msg.sender;
        // init the supply chain and add this owner
        supplyChain.push(SupplyChain({source : owner}));
    }

    function grapeVariety(string variety) public  {
        // only the current owner can set the values
        if (msg.sender != owner) return; 
        // send an event 
        wineCharacteristics.grapeVariety = variety;
        emit CharacteristicsSet("Variety changed to:", variety);
    }

    function transferOwnership(address newOwner) public {
        // only the current owner can set the values
        if (msg.sender != owner) return; 
        supplyChain.push(SupplyChain({source : newOwner}));
        owner = newOwner;
        // send an event 
        emit TransferOwnership(msg.sender, "Wine ownership has been transfered");
    }

    // *******************************
    // The function to loop over all 
    // funders to find the highest
    // *******************************
    /*
    function getTopFunder() {
        uint amount=0;
        for(uint i=0;i<funders.length;i++)
            if(amount < funders[i].amount)
                _topFunder = funders[i].addr;
    }
    */

    // *******************************
    // The function without name will prevent any
    // Eth being stored against the contract
    // *******************************
    function () public payable {
    }
}