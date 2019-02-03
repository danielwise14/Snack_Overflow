# CashData
##### Team SnackOverflow 🌯
A simple way to track who owes you money, and who you owe when you pay for one another, then request to get paid!
![slt](https://github.com/danielwise14/Snack_Overflow/raw/master/img1.png "CashDat")
![slt](https://github.com/danielwise14/Snack_Overflow/raw/master/img2.png "CashDat")
## Inspiration
The inspiration for this project was drawn from the daily experiences of our team members. As post-secondary students, we often make purchases for our peers for convenience, yet forget to follow up. This can lead to disagreements and accountability issues. Thus, we came up with the idea of CashDat, to alleviate this commonly faced issue. People will no longer have to remind their friends about paying them back! With the available API’s, we realized that we could create an application to directly tackle this problem. 
## What it does?
CashDat is an application available on the iOS platform that allows users to keep track of who owes them money, as well as who they owe money to. Users are able to scan their receipts, divide the costs with other people, and send requests for e-transfer.
## How we built it?
We used Python and Optical Character Recognition (OCR) built inside Google Cloud Vision API to implement text extraction using AI on the cloud. This was used specifically to draw item names and prices from the scanned receipts.

We used Google Firebase to store user login information, receipt images, as well as recorded transactions and transaction details.

Figma was utilized to design the front-end mobile interface that users interact with. The application itself was primarily developed with Swift with focus on iOS support.

We also used interac to implement transactions between users.

![slt](https://github.com/danielwise14/Snack_Overflow/raw/master/img3.png "Interac")
![slt](https://github.com/danielwise14/Snack_Overflow/raw/master/img4.png "Interac")

## Usage
This repository only contains the sourcecode from the project and therefore cannot be used to run the app. One can try and build the app from the xcode project folder `./CashDat`.

There are further instructions in the `./ocr` folder to test and run the ocr module of this product.

## Contributors
This app is build by the SnackOverflow 🌯team. Special thanks to all the mentors and helpers at McHacks6 2019

