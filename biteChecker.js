//endpoint for making calls into the mutantbatz smart contract
const web3Url = "https://node1.web3api.com/";


const bittenStyle = "color:black;background-color:red";
const virginStyle = "color:black;background-color:#66FF99";
const statusTextId = "BITTENTEXT";
var scrollTimer;

document.addEventListener('scroll', function(e) {
    window.clearTimeout( scrollTimer );
    scrollTimer = setTimeout(function() { showBites(); }, 250 );    
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {
   showBites();
});

function showBites(){
    var cards = document.getElementsByClassName( "AssetCardFooter--name" );
    if( cards ){
        for( var i=0; i<cards.length; i++ ){
            var batId = cards[i].textContent.split("#")[1];
            getBiteStatus( web3Url, batId, cards[i] );    
        }    
    }

}

function getBiteStatus( url, batId, card ){
    //template query for calling smart contract:
    // "to": "0xe3bf8660426becbcbc66bf3b6d255aae6203d5be
    //      - this is the address of the mutantbatz smart contract
    // "data" : "0xd6b6b00f00000000000000000000000000000000000000...etc..."
    //      - the trailing characters of this will carry the bat number to be checked
    var queryRequest ={"jsonrpc": "2.0", "id": 8, "method": "eth_call", "params": [{"from": "0x0000000000000000000000000000000000000000","data": "0xd6b6b00f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000","to": "0xe3bf8660426becbcbc66bf3b6d255aae6203d5be"}, "latest"]};
    
    // put the bat id into the data section as a hex string
    var hexString = parseInt( batId ).toString(16);
    queryRequest.params[0].data = queryRequest.params[0].data.slice(0, (hexString.length * -1) ) + hexString;

    axios.post( url, queryRequest ).catch( function (error) {
        console.log( "CATCH ERROR: ", error );
    })
    .then(function (response) {
        if (response && response.status == 200 && response.data && response.data.result ) 
            updateView( card, batId, response);
    })
    .catch(function (error) {
        console.log("POST ERROR: " + error);
    });
  }

  function updateView( card, batId, response ){
    //opensea dynamically creates/deletes/swaps cards, so make sure we're still updating the correct one
    if( card.textContent.split("#")[1] != batId ){
        console.log( "CARD BAT CHANGED, ABORTING" );
        console.log( batId + " - " +  card.textContent.split("#")[1] );
        return;
    }

    //remove any previous bitten/virgin indicator
    if( card.parentElement.lastChild.getAttribute( "id" ) == statusTextId )
        card.parentElement.removeChild( card.parentElement.lastChild );
    
    var divStatus = document.createElement( "div" );
    divStatus.setAttribute("id", statusTextId );
    
    //the smart contract return value holds the status of bitten in the last character position: 0=bitten, 1=virgin
    if(  response.data && response.data.result && response.data.result.slice(-1) == "0" ){
        divStatus.append( "BITTEN" );
        divStatus.style.cssText = "font-weight: bold; " + bittenStyle;
        card.style.cssText = bittenStyle;
    }
    else{
        divStatus.append( "VIRGIN" );
        divStatus.style.cssText = "font-weight: bold; " + virginStyle;
        card.style.cssText = virginStyle;
    }
    card.parentElement.append( divStatus );
  }
