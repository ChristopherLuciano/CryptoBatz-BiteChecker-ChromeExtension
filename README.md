# CryptoBatz-BiteChecker-ChromeExtension
Version 0.0.1

Disclaimers
------------------------------------
I in no way guarantee this software to provide accurate results.  I can not be held liably in any way for any side effects encountered from your use of this software.  **By using this software you agree that you do so by your own accord and at your own risk.**

Always check the official bite checker at [https://www.cryptobatz.com/bite-checker](https://www.cryptobatz.com/bite-checker) to ensure accurate status before taking any actions based upon the information given by this utility.

I have no direct affiliation with the CryptoBatz NFT project, Sutter Systems, Ozzy Osbourne, OpenSea.io, nor Etherscan.io.

I'm just a community member who's trying to give back where i can.


Safety
------------------------------------
Any browser extension, including this one, should be fully reviewed and vetted before you install it into your browser.  This is an advanced tool and I expect that you review the source files before installing on your system.

I recommend that you DO NOT install such extensions in any browser or on any system which you have connected to a MetaMask or other wallet.  


Features
------------------------------------
* Shows the bitten versus unbitten (virgin) status of CryptoBatz while browsing on OpenSea.io
* Bitten / Virgin status is queried directly from the MutantBatz smartcontract
* This only works for the CryptoBatz collection on OpenSea
  * You can confirm this by looking at the manifest.json file which contains the following directive
    *  "matches": ["https://opensea.io/collection/cryptobatz-by-ozzy-osbourne*"]


Installation
------------------------------------
There are already many existing resources regarding how to install Chrome browser extensions.  Here are a couple to get you started:
* https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/
* https://www.youtube.com/watch?v=hIRX1dpfqHc

Basically the process is:
* Download the source code from this repository
  * Click 'Code > Download Zip'
* Extract the downloaded files into a folder/directory on your computer
* Open a new tab in your browser and go to address chrome://extensions
* Make sure 'Developer Mode' is turned on
* Click 'Load Unpacked'
* Select the folder containing the downloaded files 
* You should get a notification 'Extension Loaded' and it should now appear in your extensions list

How It Works
------------------------------------
When you browse to opensea.io/collection/cryptobatz-by-ozzy-osbourne, this extension inspects the webpage and grabs the IDs of any bats shown.  It then uses this number to query the MutantBatz Ethereum smart contract to determine if the bat has bitten already.  Based upon the result of that query, the HTML is then modified to display a text and color indication of the bite status as follows:
* BITTEN (red) : the bat has used it's biting capability and can not bite again
* VIRGIN (green) : the bat still has it's biting ability and can bite one of the victim NFTs
